import Link from 'next/link';
import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';

async function getPost(slug) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    const post = await db.collection('posts').findOne({ slug });

    if (!post) return null;

    return {
      ...post,
      _id: post._id.toString(),
      authorId: post.authorId?.toString(),
    };
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  // ✅ CORREÇÃO: await params primeiro
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    return { title: 'Post não encontrado' };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }) {
  // ✅ CORREÇÃO: await params primeiro
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-10 space-y-8">
 
<div className="flex flex-col sm:flex-row justify-center gap-6">
  <Link
    href="/posts"
    className="text-blue-600 hover:underline"
  >
    ← Voltar para Posts
  </Link>

  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
    {post.category}
  </span>
</div>



      {/* Título */}
      <h1 className="text-4xl font-bold leading-tight">
        {post.title}
      </h1>

      {/* Data */}
      <time className="block text-gray-500 text-sm">
        {new Date(post.createdAt).toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>

      {/* Conteúdo */}
      <section className="prose prose-lg max-w-none">
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>

      {/* Compartilhamento */}
      <footer className="border-t pt-6">
        <h3 className="font-semibold mb-3">Compartilhe este post</h3>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.title
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              process.env.NEXT_PUBLIC_SITE_URL || ''
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            Facebook
          </a>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            WhatsApp
          </a>
        </div>
      </footer>
    </article>
  );
}