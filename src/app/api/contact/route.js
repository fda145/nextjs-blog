import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    if (name.length < 3 || name.length > 100) {
      return NextResponse.json(
        { error: 'Nome deve ter entre 3 e 100 caracteres' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Mensagem deve ter entre 10 e 2000 caracteres' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blog');

    const contact = {
      name,
      email,
      subject: subject || 'Sem assunto',
      message,
      createdAt: new Date(),
      read: false, // Para marcar como lida depois
      replied: false, // Para marcar como respondida
    };

    const result = await db.collection('contacts').insertOne(contact);

    console.log('Contato salvo:', result.insertedId);

    return NextResponse.json(
      {
        success: true,
        message: 'Mensagem enviada com sucesso!',
        contactId: result.insertedId.toString(),
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro ao salvar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');

    // Buscar todos os contatos (ordenados por data)
    const contacts = await db.collection('contacts')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      success: true,
      count: contacts.length,
      contacts: contacts.map(c => ({
        id: c._id.toString(),
        name: c.name,
        email: c.email,
        subject: c.subject,
        message: c.message,
        createdAt: c.createdAt,
        read: c.read,
        replied: c.replied,
      })),
    });

  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar contatos' },
      { status: 500 }
    );
  }
}