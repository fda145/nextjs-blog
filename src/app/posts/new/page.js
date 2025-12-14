'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Desenvolvimento'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao criar post');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="max-w-3xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-bold mb-6">Criar Novo Post</h1>

    {error && (
      <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título */}
      <div>
        <label className="block font-medium mb-1">Título</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o título do post"
        />
      </div>

      {/* Categoria */}
      <div>
        <label className="block font-medium mb-1">Categoria</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Desenvolvimento">Desenvolvimento</option>
          <option value="Arquitetura">Arquitetura</option>
          <option value="Segurança">Segurança</option>
          <option value="DevOps">DevOps</option>
          <option value="Mobile">Mobile</option>
          <option value="Design">Design</option>
          <option value="Geral">Geral</option>
        </select>
      </div>

      {/* Resumo */}
      <div>
        <label className="block font-medium mb-1">
          Resumo <span className="text-gray-400">(opcional)</span>
        </label>
        <textarea
          rows={3}
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Breve descrição do post"
        />
      </div>

      {/* Conteúdo */}
      <div>
        <label className="block font-medium mb-1">Conteúdo</label>
        <textarea
          required
          rows={15}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Escreva o conteúdo completo do post..."
        />
      </div>

      {/* Ações */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          {loading ? 'Publicando...' : 'Publicar Post'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          className="px-8 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
);


}
