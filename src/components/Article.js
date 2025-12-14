import Link from 'next/link';

export default function Article({
  title,
  excerpt,
  slug,
  date,
  category,
  type = 'posts',
}) {
  return (
    <article className="border rounded-lg p-4 hover:shadow-md transition">
      {/* Meta */}
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>{category}</span>
        <time dateTime={date}>
          {new Date(date).toLocaleDateString('pt-BR')}
        </time>
      </div>

      {/* Título */}
      <h2 className="text-lg font-bold mb-2">
        <Link href={`/${type}/${slug}`}>
          {title}
        </Link>
      </h2>

      {/* Resumo */}
      <p className="text-sm text-gray-600 mb-4">
        {excerpt}
      </p>

      {/* CTA */}
      <Link
        href={`/${type}/${slug}`}
        className="text-sm font-semibold text-blue-600 hover:underline"
      >
        Ler mais →
      </Link>
    </article>
  );
}