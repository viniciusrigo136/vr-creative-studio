import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'

/** Pré-carrega as duas fontes da primeira dobra (títulos e texto), para não esperar o CSS para começar a baixá-las */
function preloadFontes(): Plugin {
  return {
    name: 'preload-fontes',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const fontes = Object.keys(ctx.bundle).filter((n) =>
          /(archivo-latin-wdth-normal|inter-tight-latin-wght-normal)-[\w-]+\.woff2$/.test(n),
        )
        return {
          html,
          tags: fontes.map((n) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: `./${n}` },
            injectTo: 'head' as const,
          })),
        }
      },
    },
  }
}

/**
 * Coloca o CSS (≈10 KB comprimido) direto no index.html, em vez de um arquivo separado.
 * Assim a página não espera baixar o CSS para começar a aparecer (CSS "bloqueante").
 */
function cssNoHtml(): Plugin {
  return {
    name: 'css-no-html',
    enforce: 'post',
    apply: 'build',
    generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return
      let fonte = String(html.source)
      for (const [nome, arquivo] of Object.entries(bundle)) {
        if (arquivo.type !== 'asset' || !nome.endsWith('.css')) continue
        const link = new RegExp(`<link rel="stylesheet"[^>]*href="\\./${nome.replace(/[.]/g, '\\.')}"[^>]*>`)
        if (!link.test(fonte)) continue
        // as fontes ficam em assets/: ajusta os caminhos relativos ao sair de assets/x.css para a raiz
        const css = String(arquivo.source).replace(/url\(\.\//g, 'url(./assets/')
        fonte = fonte.replace(link, () => `<style>${css}</style>`)
        delete bundle[nome]
      }
      html.source = fonte
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), preloadFontes(), cssNoHtml()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
})
