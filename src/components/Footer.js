import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Sobre */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            📝 MeuBlog
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Blog moderno criado com Next.js, focado em desenvolvimento web,
            tecnologia e boas práticas de engenharia.
          </p>
        </div>

        {/* Links rápidos */}
        <div>
          <h3 className="text-lg font-bold mb-3">Links Rápidos</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/posts" className="hover:text-white transition">
                Posts
              </Link>
            </li>
            <li>
              <Link href="/noticias" className="hover:text-white transition">
                Notícias
              </Link>
            </li>
            <li>
              <Link href="/projetos" className="hover:text-white transition">
                Projetos
              </Link>
            </li>
          </ul>
        </div>

        {/* Contato / Social */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contato</h3>
          <p className="text-sm text-gray-400 mb-3">
            flavio.agapito@al.infnet.edu.br
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
          
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                LinkedIn
              </a>
            </li>
          
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="text-center text-xs text-gray-500 border-t border-white/10 py-4">
        &copy; {new Date().getFullYear()} MeuBlog. Todos os direitos reservados.
      </div>
    </footer>
  );
}