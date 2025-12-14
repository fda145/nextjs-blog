import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    // ✅ CORREÇÃO: await params primeiro
    const resolvedParams = await params;
    const client = await clientPromise;
    const db = client.db('blog');
    
    const post = await db.collection('posts').findOne({
      _id: new ObjectId(resolvedParams.id)
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar post' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    // ✅ CORREÇÃO: await params primeiro
    const resolvedParams = await params;
    const { title, content, excerpt, category } = await request.json();

    const client = await clientPromise;
    const db = client.db('blog');

    const post = await db.collection('posts').findOne({
      _id: new ObjectId(resolvedParams.id)
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }

    if (post.authorId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      );
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    await db.collection('posts').updateOne(
      { _id: new ObjectId(resolvedParams.id) },
      {
        $set: {
          title,
          content,
          excerpt: excerpt || content.substring(0, 200) + '...',
          slug,
          category: category || 'Geral',
          updatedAt: new Date(),
        }
      }
    );

    return NextResponse.json(
      { message: 'Post atualizado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
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

    // ✅ CORREÇÃO: await params primeiro
    const resolvedParams = await params;
    const client = await clientPromise;
    const db = client.db('blog');

    const post = await db.collection('posts').findOne({
      _id: new ObjectId(resolvedParams.id)
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }

    if (post.authorId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      );
    }

    await db.collection('posts').deleteOne({
      _id: new ObjectId(resolvedParams.id)
    });

    return NextResponse.json(
      { message: 'Post deletado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar post' },
      { status: 500 }
    );
  }
}