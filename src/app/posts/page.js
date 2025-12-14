import Article from '@/components/Article';
import clientPromise from '@/lib/mongodb';

async function getPosts() {
  try {
    const client = await clientPromise;
    const db = client.db('blog');

    const posts = await db
      .collection('posts')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      authorId: post.authorId?.toString(),
    }));
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Cabeçalho */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Todos os Posts</h1>
        <p className="text-gray-600">
          Explore nossos artigos sobre desenvolvimento, tecnologia e muito mais
        </p>
      </header>

      {/* Lista de posts */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum post publicado ainda
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Article
              key={post._id}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              date={post.createdAt}
              category={post.category}
              type="posts"
            />
          ))}
        </div>
      )}
    </section>
  );
}