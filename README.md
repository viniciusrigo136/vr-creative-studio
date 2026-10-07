# VR Creative — site portfólio

Site de uma página (React + Vite + Tailwind CSS v4), escuro, com as cores da logo.

## Rodar no computador

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm run build      # gera a pasta dist/ pronta para publicar
```

## Onde editar

| O quê | Arquivo |
|---|---|
| WhatsApp, e-mail, Instagram | `src/content.ts` → `contato` |
| Projetos do portfólio | `src/content.ts` → `projetos` |
| Serviços, etapas, pacotes, perguntas | `src/content.ts` |
| Prints dos projetos | `public/portfolio/` (lista em `src/shots.ts`) |
| Logo e favicon | `public/brand/`, `public/favicon.png`, `public/og.jpg` |
| Cores e fontes | `src/index.css` (bloco `@theme`) |
| Título e descrição para o Google | `index.html` |

## Componentes do 21st.dev usados

| Componente | Autor no 21st.dev | Onde aparece |
|---|---|---|
| Container Scroll Animation | Aceternity | Vitrine 3D da EcoCharge |
| Word Rotate | Magic UI | Palavra que troca no título |
| Number Ticker | Magic UI | Números do topo |
| Marquee | Magic UI | Faixa de segmentos |
| Magic Card | Magic UI | Cartões de serviços (brilho segue o mouse) |
| Border Beam | Magic UI | Pacote recomendado |
| Blur Fade | Magic UI | Entrada suave das seções |
| Velaris | 21st.dev | Fundo animado do topo (WebGL) |

Ficam em `src/components/ui/`. Os efeitos próprios do site (barra de progresso, títulos que sobem, carrossel com bolinhas no celular, prévias que rolam sozinhas no portfólio) ficam em `src/components/fx.tsx`. O projeto já tem `components.json`, então o CLI do shadcn funciona aqui. Para trocar ou adicionar outro, no 21st.dev clique em
“Copy” no comando `npx shadcn@latest add ...` e rode na pasta do projeto, ou copie o código para essa pasta.

## Publicar com domínio próprio (recomendado: Cloudflare Pages + Registro.br)

**Custo:** hospedagem grátis + domínio .com.br por R$ 40/ano no Registro.br.

1. **Domínio** — registre em <https://registro.br> (ex.: `vrcreative.com.br`).
2. **Código no GitHub** — crie um repositório e envie esta pasta (sem `node_modules`).
3. **Cloudflare Pages** — em <https://dash.cloudflare.com> → *Workers & Pages* → *Create* → *Pages* → conecte o GitHub e escolha o repositório.
   - Framework preset: **Vite** (ou React (Vite))
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Conectar o domínio** — no Cloudflare, *Add a domain* com o seu `.com.br`. Ele mostra dois *nameservers*.
   No Registro.br, em *DNS → Alterar servidores DNS*, cole esses dois. Depois, no projeto Pages → *Custom domains* → adicione `seudominio.com.br` e `www.seudominio.com.br`.
   O HTTPS é ativado sozinho.
5. A cada `git push`, o site é atualizado automaticamente.

**Alternativa:** Vercel funciona igual (importa do GitHub, detecta Vite), mas o plano grátis (Hobby) é para uso não comercial; para um site que vende serviços, o plano pago é o indicado.

## E-mail com o domínio (opcional)

Com o domínio no Cloudflare, ative *Email Routing* para receber `contato@seudominio.com.br` no seu Outlook, sem custo.
