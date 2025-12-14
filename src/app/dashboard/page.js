'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserAndPosts();
  }, []);

  const fetchUserAndPosts = async () => {
    try {
      const userRes = await fetch('/api/user');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }

      const userData = await userRes.json();
      setUser(userData.user);

      const postsRes = await fetch('/api/posts');
      const postsData = await postsRes.json();
      setPosts(postsData.posts || []);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Cabeçalho */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Bem-vindo, {user?.name}!
          </p>
        </div>

        <Link
          href="/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Novo Post
        </Link>
      </header>

      {/* Lista de posts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Meus Posts</h2>

        {posts.length === 0 ? (
          <div className="p-6 border rounded text-center">
            <p className="mb-4 text-gray-600">
              Você ainda não tem posts publicados
            </p>
            <Link
              href="/posts/new"
              className="text-blue-600 font-semibold hover:underline"
            >
              Criar Primeiro Post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post._id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-bold">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {post.excerpt}
                  </p>

                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>{post.category}</span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Ver
                  </Link>

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Deletar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}