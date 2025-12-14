import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getProjeto(slug) {
  const projetos = {
    'ecommerce-nextjs-stripe': {
      title: 'E-commerce com Next.js e Stripe',
      content: 'Este projeto demonstra a construção de uma loja virtual completa utilizando as melhores práticas de desenvolvimento.\n\nTecnologias utilizadas: Next.js 14, Stripe, MongoDB, Tailwind CSS.\n\nO projeto inclui: catálogo de produtos, carrinho de compras, checkout seguro, painel administrativo e muito mais.',
      date: '2024-01-15',
      category: 'Full Stack',
      demo: 'https://exemplo.com',
      github: 'https://github.com'
    },
    'dashboard-analytics-realtime': {
      title: 'Dashboard Analytics em Tempo Real',
      content: 'Dashboard sofisticado para visualização de métricas e analytics em tempo real.\n\nUtiliza WebSockets para atualizações em tempo real e Chart.js para visualizações interativas.\n\nIdeal para monitoramento de aplicações, KPIs de negócio e métricas de performance.',
      date: '2024-01-12',
      category: 'Data Visualization',
      demo: 'https://exemplo.com',
      github: 'https://github.com'
    }
  };

  return projetos[slug] || null;
}

export async function generateMetadata({ params }) {
  // ✅ CORREÇÃO: await params primeiro
  const resolvedParams = await params;
  const projeto = await getProjeto(resolvedParams.slug);

  if (!projeto) {
    return { title: 'Projeto não encontrado' };
  }

  return {
    title: projeto.title,
    description: projeto.content.substring(0, 160),
  };
}

export default async function ProjetoPage({ params }) {
  // ✅ CORREÇÃO: await params primeiro
  const resolvedParams = await params;
  const projeto = await getProjeto(resolvedParams.slug);

  if (!projeto) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      {/* Voltar */}
      <Link href="/projetos" className="text-blue-600 hover:underline">
        ← Voltar para Projetos
      </Link>

      {/* Categoria */}
      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
        {projeto.category}
      </span>

      {/* Título */}
      <h1 className="text-4xl font-bold">{projeto.title}</h1>

      {/* Data */}
      <time className="block text-gray-500 text-sm">
        {new Date(projeto.date).toLocaleDateString('pt-BR')}
      </time>

      {/* Conteúdo */}
      <section className="prose prose-lg max-w-none">
        {projeto.content.split('\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      {/* Links */}
      <div className="flex gap-4 pt-4">
        <a
          href={projeto.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Ver Demo
        </a>

        <a
          href={projeto.github}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900 transition"
        >
          Código no GitHub
        </a>
      </div>
    </article>
  );
}