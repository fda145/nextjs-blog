
# 📘 MeuBlog — Projeto Full Stack com Next.js 14

Projeto de blog moderno desenvolvido com **Next.js 14 (App Router)**, focado em **boas práticas de arquitetura**, **segurança**, **renderização otimizada** e **experiência do usuário**.  
O sistema inclui autenticação, CRUD de posts, formulários validados, integração com banco de dados em nuvem e uma implementação básica de GraphQL.

---

## 🚀 Visão Geral

- **Framework:** Next.js 14 (App Router)
- **Deploy:** Vercel (Serverless)
- **Banco de Dados:** MongoDB Atlas
- **Autenticação:** Firebase + JWT
- **Estilo:** Tailwind CSS
- **Arquitetura:** Server Components + API Routes
- **Status do Projeto:** ✅ Completo

---

## 📊 Checklist de Requisitos do Projeto

**Total de Requisitos:** 17  
**Requisitos Atendidos:** 17  
**Taxa de Conclusão:** **100% ✅**

---

## 1️⃣ Arquitetura, Performance e Segurança

### ✅ Deploy em Plataforma Serverless
Deploy realizado na **Vercel**, com CDN e auto-scaling.

URL: http://nextjs-blog-eosin-two-66.vercel.app/

---

### ✅ Autenticação com Firebase
Configuração segura do Firebase Authentication.

Arquivo: `src/lib/firebase.js`

---

### ✅ API Routes Implementadas

```
/api/auth/register
/api/auth/login
/api/auth/logout
/api/user
/api/posts
/api/posts/[id]
/api/contact
```

---

### ✅ Banco de Dados — MongoDB Atlas
Coleções:
- users
- posts
- contacts

Arquivo: `src/lib/mongodb.js`

---

## 2️⃣ Formulários e Validações

### ✅ Formulários
- Registro
- Login
- Criar Post
- Contato

### ✅ Validação Front-end e Back-end
Validações completas em ambos os lados.

---

## 3️⃣ Renderização

### ✅ GraphQL (Implementação Básica)

- Endpoint: `src/api/graphql/route.js`
- Página: `src/app/api/posts/graphql/page.js`

Solução funcional, didática e simples.

---

### ✅ Server Components e SSR
Uso de Server Functions substituindo `getServerSideProps`.

---

### ✅ Rotas Dinâmicas
- `/posts/[slug]`
- `/noticias/[slug]`
- `/projetos/[slug]`

---

## 4️⃣ Autenticação

### ✅ Login, Logout e Segurança
- JWT
- Cookies httpOnly
- Middleware de proteção
- Validação em múltiplas camadas

---

## 🎯 Conclusão

Projeto Full Stack completo, moderno e escalável, pronto para evolução futura.
