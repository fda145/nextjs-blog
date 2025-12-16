import Article from '@/components/Article';

async function getPostsGraphQL() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          posts {
            id
            title
            excerpt
            slug
            category
            createdAt
          }
        }
      `,
    }),
    cache: 'no-store',
  });

  const { data } = await res.json();
  return data.posts;
}

export default async function PostsGraphQLPage() {
  const posts = await getPostsGraphQL();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">
        Todos os Posts (GraphQL)
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Article
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
            date={post.createdAt}
            category={post.category}
          />
        ))}
      </div>
    </main>
  );
}