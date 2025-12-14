import Article from '@/components/Article';

async function getProjetos() {
  return [
    {
      id: '1',
      title: 'E-commerce com Next.js e Stripe',
      excerpt:
        'Loja virtual completa construída com Next.js, integração com Stripe para pagamentos e dashboard administrativo.',
      slug: 'ecommerce-nextjs-stripe',
      date: '2024-01-15',
      category: 'Full Stack',
    },
    {
      id: '2',
      title: 'Dashboard Analytics em Tempo Real',
      excerpt:
        'Sistema de analytics com visualização de dados em tempo real usando WebSockets e Chart.js.',
      slug: 'dashboard-analytics-realtime',
      date: '2024-01-12',
      category: 'Data Visualization',
    },
  ];
}

export default async function ProjetosPage() {
  const projetos = await getProjetos();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Cabeçalho */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Projetos</h1>
        <p className="text-gray-600">
          Confira nossos projetos e casos de estudo
        </p>
      </header>

      {/* Lista de projetos */}
      <section className="grid md:grid-cols-2 gap-8">
        {projetos.map((projeto) => (
          <Article
            key={projeto.id}
            title={projeto.title}
            excerpt={projeto.excerpt}
            slug={projeto.slug}
            date={projeto.date}
            category={projeto.category}
            type="projetos"
          />
        ))}
      </section>
    </div>
  );
}