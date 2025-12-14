import Article from '@/components/Article';

async function getNoticias() {
  return [
    {
      id: '1',
      title: 'Next.js 15 Lançado com Novos Recursos',
      excerpt: 'A Vercel anuncia o lançamento do Next.js 15 com melhorias significativas de performance e novos recursos para desenvolvedores.',
      slug: 'nextjs-15-lancado',
      date: '2024-01-20',
      category: 'Lançamentos'
    },
    {
      id: '2',
      title: 'React Server Components Revolucionam o Desenvolvimento',
      excerpt: 'Os React Server Components estão mudando a forma como construímos aplicações web modernas, oferecendo melhor performance e experiência do desenvolvedor.',
      slug: 'react-server-components',
      date: '2024-01-18',
      category: 'Tecnologia'
    }
  ];
}

export default async function NoticiasPage() {
  const noticias = await getNoticias();

 return (
  <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
    {/* Cabeçalho */}
    <header className="text-center space-y-3">
      <h1 className="text-4xl font-bold">Notícias</h1>
      <p className="text-gray-600">
        Fique por dentro das últimas novidades do mundo tech
      </p>
    </header>

    {/* Lista de notícias */}
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {noticias.map((noticia) => (
        <article
          key={noticia.id}
          className="border rounded-lg p-6 hover:shadow transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            {noticia.title}
          </h2>

          <p className="text-gray-600 mb-4">
            {noticia.excerpt}
          </p>

          <span className="text-sm text-gray-400">
            {new Date(noticia.date).toLocaleDateString('pt-BR')}
          </span>
        </article>
      ))}
    </section>
  </div>
);

}