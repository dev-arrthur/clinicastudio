# Clínica Studio — Website

Landing page institucional da **Clínica Studio**, em Juiz de Fora/MG, criada em HTML, CSS, JavaScript e Bootstrap 5.

## Stack

- HTML5 semântico
- CSS3 customizado
- JavaScript vanilla
- Bootstrap 5.3
- Bootstrap Icons
- JSON-LD / Schema.org

## SEO e AEO

O projeto inclui:

- `title`, meta description e canonical
- Open Graph e Twitter Cards
- `robots.txt` e `sitemap.xml`
- dados estruturados JSON-LD para `Dentist`, `LocalBusiness`, `WebSite` e `FAQPage`
- FAQ visível e semântica
- conteúdo local para "dentista em Juiz de Fora"
- hierarquia correta de headings
- textos alternativos em imagens
- links de telefone, e-mail, mapa e WhatsApp
- carregamento tardio de imagens secundárias
- suporte a `prefers-reduced-motion`
- HTML responsivo e acessível

## Contato configurado

- WhatsApp: **(32) 98855-0005**
- Telefone: **(32) 3224-7851**
- E-mail: **clinicastudioodontologico@gmail.com**
- Endereço: **Av. Rui Barbosa, 689 — Santa Terezinha — Juiz de Fora/MG**
- Atendimento: **segunda a sexta, 09h–19h**

## Formulário

O formulário não exige backend. Ao enviar, ele monta uma mensagem personalizada e abre o WhatsApp da clínica.

## Imagens

O repositório estava vazio no início desta implementação. O site público anterior indexado na web identifica fotos próprias da clínica, recepção, sala de espera e consultório, porém os arquivos originais não estavam disponíveis neste repositório. Por isso, esta primeira versão usa imagens ilustrativas externas e deixa essa informação visível no código/site para evitar representar imagens de terceiros como sendo da estrutura real.

Assim que as imagens oficiais forem adicionadas, basta trocar os `src` no bloco `#estrutura` e no hero. Recomenda-se exportá-las em WebP/AVIF e manter JPG como fallback quando necessário.

## Publicação

O projeto é estático e pode ser publicado em GitHub Pages, Vercel, Netlify ou hospedagem tradicional. O domínio canônico configurado é:

`https://www.clinicastudio.com/`

## Desenvolvimento local

Abra `index.html` diretamente no navegador ou rode um servidor local simples:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.
