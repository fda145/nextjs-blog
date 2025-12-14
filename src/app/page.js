import Link from 'next/link';
import Article from '@/components/Article';
import ContactForm from '@/components/ContactForm';

async function getRecentPosts() {
  return [
    {
      id: '1',
      title: 'Introdução ao Next.js 14',
      excerpt:
        'Descubra os recursos mais recentes do Next.js 14 e como eles podem melhorar suas aplicações web.',
      slug: 'introducao-nextjs-14',
      date: '2024-01-15',
      category: 'Desenvolvimento',
    },
    {
      id: '2',
      title: 'Arquitetura Jamstack Explicada',
      excerpt:
        'Entenda os princípios da arquitetura Jamstack e por que ela está revolucionando o desenvolvimento web.',
      slug: 'arquitetura-jamstack-explicada',
      date: '2024-01-10',
      category: 'Arquitetura',
    },
    {
      id: '3',
      title: 'Autenticação Segura com Firebase',
      excerpt:
        'Aprenda a implementar autenticação segura em suas aplicações usando Firebase Authentication.',
      slug: 'autenticacao-segura-firebase',
      date: '2024-01-05',
      category: 'Segurança',
    },
  ];
}

export default async function Home() {
  const posts = await getRecentPosts();

  return (
    <main className="space-y-24">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Bem-vindo ao <span className="text-blue-200">MeuBlog</span>
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Conteúdo de qualidade sobre desenvolvimento web, tecnologia
            moderna e boas práticas de engenharia.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/posts"
              className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition"
            >
              Ver Posts
            </Link>

            <Link
              href="/register"
              className="px-8 py-3 border border-white/40 rounded-lg hover:bg-white/10 transition"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </section>

      {/* POSTS RECENTES */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Posts Recentes</h2>
          <Link
            href="/posts"
            className="text-blue-600 font-medium hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Article
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              date={post.date}
              category={post.category}
            />
          ))}
        </div>
      </section>

      {/* RECURSOS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que ler o MeuBlog?
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 text-center">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-sm text-gray-600">
                Aplicações rápidas, modernas e bem estruturadas
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2">Segurança</h3>
              <p className="text-sm text-gray-600">
                Boas práticas de autenticação e proteção de dados
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold mb-2">Responsivo</h3>
              <p className="text-sm text-gray-600">
                Experiência perfeita em qualquer dispositivo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <ContactForm />
      </section>
    </main>
  );
}