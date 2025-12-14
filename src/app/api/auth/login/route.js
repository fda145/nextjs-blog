import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blog');
    
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString());
    
    const response = NextResponse.json(
      { 
        message: 'Login realizado com sucesso',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 200 }
    );

    // ✅ Configurar cookie com todas as opções corretas
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}