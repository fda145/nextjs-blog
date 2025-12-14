import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getNoticia(slug) {
  const noticias = {
    'nextjs-15-lancado': {
      title: 'Next.js 15 Lançado com Novos Recursos',
      content: 'A Vercel anunciou hoje o lançamento do Next.js 15, trazendo melhorias significativas de performance e novos recursos que prometem revolucionar o desenvolvimento web.\n\nEntre as principais novidades estão: melhorias no App Router, otimizações de cache, suporte aprimorado para React Server Components e muito mais.\n\nA nova versão também traz melhorias de DX (Developer Experience) com mensagens de erro mais claras e ferramentas de debug aprimoradas.',
      date: '2024-01-20',
      category: 'Lançamentos'
    },
    'react-server-components': {
      title: 'React Server Components Revolucionam o Desenvolvimento',
      content: 'Os React Server Components representam uma mudança fundamental na forma como construímos aplicações React.\n\nEssas novas funcionalidades permitem que componentes sejam renderizados no servidor, reduzindo o JavaScript enviado ao cliente e melhorando significativamente a performance.\n\nGrandes empresas como Meta e Vercel já estão adotando essa tecnologia em produção com resultados impressionantes.',
      date: '2024-01-18',
      category: 'Tecnologia'
    }
  };

  return noticias[slug] || null;
}

export async function generateMetadata({ params }) {
  // ✅ CORREÇÃO: await params primeiro
  const resolvedParams = await params;
  const noticia = await getNoticia(resolvedParams.slug);

  if (!noticia) {
    return { title: 'Notícia não encontrada' };
  }

  return {
    title: noticia.title,
    description: noticia.content.substring(0, 160),
  };
}

export default async function NoticiaPage({ params }) {
  // ✅ CORREÇÃO: await params primeiro
  const resolvedParams = await params;
  const noticia = await getNoticia(resolvedParams.slug);

  if (!noticia) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      {/* Voltar */}
      <Link href="/noticias" className="text-blue-600 hover:underline">
        ← Voltar para Notícias
      </Link>

      {/* Categoria */}
      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
        {noticia.category}
      </span>

      {/* Título */}
      <h1 className="text-4xl font-bold">{noticia.title}</h1>

      {/* Data */}
      <time className="block text-gray-500 text-sm">
        {new Date(noticia.date).toLocaleDateString('pt-BR')}
      </time>

      {/* Conteúdo */}
      <section className="prose prose-lg max-w-none">
        {noticia.content.split('\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
    </article>
  );
}