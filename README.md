# Clínica Studio — Website Institucional

Rebuild completo do site da **Clínica Studio**, em Juiz de Fora/MG, feito em HTML5, CSS3, JavaScript Vanilla e Bootstrap 5.

## Identidade visual

A interface segue a identidade oficial da Clínica Studio:
- verde/azul-petróleo principal: `#008788`
- verde escuro: `#063f40`
- fundos claros e branco
- logotipo oficial reaproveitado do site anterior
- imagens institucionais, casos e equipe reaproveitados da mídia pública do site anterior

> Neste momento as fotos e o logo estão referenciados no CDN público legado da própria Clínica Studio (Wix). Para independência total do provedor, recomenda-se futuramente copiar esses arquivos para `assets/img/` mantendo os mesmos nomes e textos alternativos.

## Rotas preservadas

A reconstrução mantém a arquitetura histórica para reduzir quebra de links e perda de SEO:

### Institucional
- `/`
- `/estrutura/`
- `/contato/`
- `/blog/`

### Tratamentos
- `/faceta-de-porcelana-juiz-de-fora/`
- `/clareamento-dental/`
- `/implantedental/`
- `/proteses-dentais/`
- `/aparelho/`
- `/limpeza/`
- `/restauracoes/`
- `/tratamento-de-canal/`
- `/placa-de-bruxismo/`

### Conteúdo histórico
Também foram restauradas as 20 URLs de artigos do site antigo sob `/single-post/.../`, com conteúdo reescrito e atualizado em linguagem educativa.

## SEO / AEO

A implementação inclui:
- HTML semântico e hierarquia correta de headings
- titles e meta descriptions exclusivos
- URLs canônicas
- Open Graph
- conteúdo local voltado para Juiz de Fora
- dados estruturados Schema.org
  - `Dentist`
  - `LocalBusiness`
  - `WebSite`
  - `Service`
  - `FAQPage`
  - `Blog`
  - `BlogPosting`
  - `BreadcrumbList`
- FAQs visíveis nas páginas
- `robots.txt`
- `sitemap.xml` com todas as rotas indexáveis
- `llms.txt` para fornecer contexto textual direto a agentes e sistemas de IA
- textos alternativos em imagens
- linguagem objetiva e respostas curtas em blocos AEO
- preservação das URLs históricas

## UX / performance

- Bootstrap 5
- responsivo para desktop, tablet e celular
- navegação sticky
- menu mobile offcanvas
- dropdown de tratamentos
- animações via IntersectionObserver
- respeito a `prefers-reduced-motion`
- lazy-loading em imagens secundárias
- formulário sem backend que prepara a mensagem no WhatsApp
- botão flutuante de WhatsApp
- favicon e webmanifest
- página 404 personalizada

## Contato configurado

- WhatsApp: **(32) 98855-0005**
- Telefone: **(32) 3224-7851**
- E-mail: **clinicastudioodontologico@gmail.com**
- Endereço: **Av. Rui Barbosa, 689 — Santa Terezinha — Juiz de Fora/MG — CEP 36045-410**
- Atendimento publicado: **segunda a sexta, 09h–19h**

## Conteúdo odontológico

Textos antigos foram reorganizados e reescritos para:
- evitar promessas absolutas de resultado;
- deixar claro que indicações dependem de avaliação;
- separar informação educativa de diagnóstico;
- melhorar legibilidade, SEO e respostas de mecanismos de busca/IA.

## Desenvolvimento local

```bash
python -m http.server 8080
```

Acesse `http://localhost:8080`.

## Produção

O site é estático e pode ser publicado em Vercel, Netlify, GitHub Pages ou hospedagem tradicional. O domínio canônico configurado é:

`https://www.clinicastudio.com/`
