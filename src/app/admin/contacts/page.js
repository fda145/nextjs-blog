'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {

      const userRes = await fetch('/api/user');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/contact');
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mensagens de Contato</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          ← Voltar ao Dashboard
        </Link>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-xl">Nenhuma mensagem recebida ainda</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            Total: {contacts.length} mensagem(ns)
          </p>

          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {contact.name}
                  </h3>
                  <p className="text-gray-600">{contact.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleString('pt-BR')}
                </div>
              </div>

              {contact.subject && (
                <p className="text-gray-700 font-semibold mb-2">
                  Assunto: {contact.subject}
                </p>
              )}

              <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded">
                {contact.message}
              </p>

              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'Sua mensagem'}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  📧 Responder por Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}