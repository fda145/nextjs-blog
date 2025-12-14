import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    
    const posts = await db.collection('posts')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    const { title, content, excerpt, category } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Título e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const client = await clientPromise;
    const db = client.db('blog');

    const result = await db.collection('posts').insertOne({
      title,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      slug,
      category: category || 'Geral',
      authorId: new ObjectId(decoded.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { 
        message: 'Post criado com sucesso',
        postId: result.insertedId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json(
      { error: 'Erro ao criar post' },
      { status: 500 }
    );
  }
}