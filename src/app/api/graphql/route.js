import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import clientPromise from '@/lib/mongodb';

const typeDefs = `
  type Post {
    id: ID!
    title: String!
    excerpt: String
    slug: String!
    category: String
    createdAt: String
  }

  type Query {
    posts: [Post!]!
    post(slug: String!): Post
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      const client = await clientPromise;
      const db = client.db('blog');
      const posts = await db.collection('posts')
        .find({})
        .limit(50)
        .toArray();
      
      return posts.map(post => ({
        id: post._id.toString(),
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        category: post.category,
        createdAt: post.createdAt?.toISOString(),
      }));
    },
    
    post: async (_, { slug }) => {
      const client = await clientPromise;
      const db = client.db('blog');
      const post = await db.collection('posts').findOne({ slug });
      
      if (!post) return null;
      
      return {
        id: post._id.toString(),
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        category: post.category,
        createdAt: post.createdAt?.toISOString(),
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request) {
  return handler(request);
}

export async function POST(request) {
  return handler(request);
}