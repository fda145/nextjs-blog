'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    // Fechar menu ao clicar fora
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('nav')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/user');
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setUserName(data.user.name);
      } else {
        setIsAuthenticated(false);
        setUserName('');
      }
    } catch {
      setIsAuthenticated(false);
      setUserName('');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setUserName('');
      setMenuOpen(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl md:text-2xl font-bold hover:opacity-80 transition flex items-center gap-2"
            onClick={closeMenu}
          >
            <span className="text-2xl">📝</span>
            <span className="hidden sm:inline">MeuBlog</span>
            <span className="sm:hidden">Blog</span>
          </Link>

          {/* Menu Desktop - Links Principais */}
          <div className="hidden lg:flex items-center gap-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg hover:bg-white/10 transition ${pathname === '/' ? 'bg-white/20' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/posts" 
              className={`px-4 py-2 rounded-lg hover:bg-white/10 transition ${pathname.startsWith('/posts') ? 'bg-white/20' : ''}`}
            >
              Posts
            </Link>
            <Link 
              href="/noticias" 
              className={`px-4 py-2 rounded-lg hover:bg-white/10 transition ${pathname.startsWith('/noticias') ? 'bg-white/20' : ''}`}
            >
              Notícias
            </Link>
            <Link 
              href="/projetos" 
              className={`px-4 py-2 rounded-lg hover:bg-white/10 transition ${pathname.startsWith('/projetos') ? 'bg-white/20' : ''}`}
            >
              Projetos
            </Link>
          </div>

          {/* Menu Desktop - Autenticação */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <span className="px-3 py-2 text-white/90 text-sm">
                  👋 Olá, <span className="font-semibold">{userName}</span>
                </span>
                <Link 
                  href="/dashboard" 
                  className={`px-4 py-2 rounded-lg hover:bg-white/10 transition ${pathname.startsWith('/dashboard') ? 'bg-white/20' : ''}`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition font-semibold"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition font-semibold"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition font-semibold"
                >
                  Registrar
                </Link>
              </>
            )}
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Mobile - Dropdown */}
        {menuOpen && (
          <div className="lg:hidden mt-3 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden animate-slideDown">
            <div className="flex flex-col">
              {/* Saudação Mobile */}
              {isAuthenticated && userName && (
                <div className="px-4 py-3 bg-white/5 border-b border-white/10">
                  <p className="text-sm text-white/80">Bem-vindo,</p>
                  <p className="font-semibold text-lg">{userName}</p>
                </div>
              )}

              {/* Links de Navegação */}
              <Link 
                href="/" 
                onClick={closeMenu}
                className={`px-4 py-3 hover:bg-white/10 transition border-b border-white/10 ${pathname === '/' ? 'bg-white/20' : ''}`}
              >
                🏠 Home
              </Link>
              <Link 
                href="/posts" 
                onClick={closeMenu}
                className={`px-4 py-3 hover:bg-white/10 transition border-b border-white/10 ${pathname.startsWith('/posts') ? 'bg-white/20' : ''}`}
              >
                📄 Posts
              </Link>
              <Link 
                href="/noticias" 
                onClick={closeMenu}
                className={`px-4 py-3 hover:bg-white/10 transition border-b border-white/10 ${pathname.startsWith('/noticias') ? 'bg-white/20' : ''}`}
              >
                📰 Notícias
              </Link>
              <Link 
                href="/projetos" 
                onClick={closeMenu}
                className={`px-4 py-3 hover:bg-white/10 transition border-b border-white/10 ${pathname.startsWith('/projetos') ? 'bg-white/20' : ''}`}
              >
                💼 Projetos
              </Link>

              {/* Autenticação Mobile */}
              {isAuthenticated ? (
                <>
                  <Link
                    href="/admin/contacts"
                    onClick={closeMenu}
                    className={`px-4 py-3 hover:bg-white/10 transition border-b border-white/10 ${pathname.startsWith('/contacts') ? 'bg-white/20' : ''}`}
                  >
                    📬 Contatos
                  </Link>
                  <Link 
                    href="/dashboard" 
                    onClick={closeMenu}
                    className={`px-4 py-3 hover:bg-white/10 transition border-b border-white/10 ${pathname.startsWith('/dashboard') ? 'bg-white/20' : ''}`}
                  >
                    📊 Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="px-4 py-3 bg-red-500/80 hover:bg-red-500 transition text-left font-semibold"
                  >
                    🚪 Sair
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    onClick={closeMenu}
                    className="px-4 py-3 bg-green-500/80 hover:bg-green-500 transition border-b border-white/10 font-semibold"
                  >
                    🔐 Login
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={closeMenu}
                    className="px-4 py-3 bg-blue-500/80 hover:bg-blue-500 transition font-semibold"
                  >
                    ✨ Criar Conta
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Overlay para fechar menu mobile */}
      {menuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}