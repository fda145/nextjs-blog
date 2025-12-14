'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    await new Promise(resolve => setTimeout(resolve, 1000));

    setStatus('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Entre em Contato</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mensagem */}
        <div>
          <label className="block text-sm font-medium mb-1">Mensagem</label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enviar Mensagem
        </button>
      </form>

      {/* Status */}
      {status && (
        <p className="mt-4 text-center text-sm text-green-600">
          {status}
        </p>
      )}
    </section>
  );
}