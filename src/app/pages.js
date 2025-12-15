import Link from 'next/link';
import Article from '@/components/Article';
import ContactForm from '@/components/ContactForm';
import clientPromise from '@/lib/mongodb';

async function getRecentPosts() {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    
    const posts = await db.collection('posts')
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    // Se não tiver posts, retornar array vazio
    if (!posts || posts.length === 0) {
      return [];
    }

    // Converter para formato esperado
    return posts.map(post => ({
      id: post._id.toString(),
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      date: post.createdAt,
      category: post.category,
    }));
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getRecentPosts();

  return (
    <div className="space-y-12">
      {/* SEÇÃO HERO */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Bem-vindo ao MeuBlog</h1>
        <p className="text-xl mb-8">Conteúdo de qualidade sobre desenvolvimento web e tecnologia</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/posts" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Ver Posts
          </Link>
          <Link href="/register" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
            Criar Conta
          </Link>
        </div>
      </section>

      {/* SEÇÃO DE POSTS RECENTES */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Posts Recentes</h2>
        
        {posts.length === 0 ? (
          // Se não tiver posts, mostrar mensagem
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Nenhum post publicado ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Seja o primeiro a compartilhar conhecimento!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/login" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Fazer Login
              </Link>
              <Link 
                href="/register" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Criar Conta
              </Link>
            </div>
          </div>
        ) : (
          // Se tiver posts, mostrar grid
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Article key={post.id} {...post} type="posts" />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/posts" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                Ver Todos os Posts
              </Link>
            </div>
          </>
        )}
      </section>

      {/* SEÇÃO DE RECURSOS */}
      <section className="bg-gray-100 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Recursos do Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Performance</h3>
            <p className="text-gray-600">Otimizado com Next.js para carregamento ultrarrápido</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Seguro</h3>
            <p className="text-gray-600">Autenticação robusta com Firebase e MongoDB</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Responsivo</h3>
            <p className="text-gray-600">Design adaptável para todos os dispositivos</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE CONTATO */}
      <section>
        <ContactForm />
      </section>
    </div>
  );
}