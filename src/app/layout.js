import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MeuBlog - Blog Moderno com Next.js',
  description: 'Blog criado com Next.js, Firebase e MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}