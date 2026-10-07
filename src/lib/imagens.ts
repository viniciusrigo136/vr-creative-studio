// As versões "-800.webp" são geradas por `npm run imagens` (scripts/otimizar-imagens.mjs).

/** srcset com a versão leve (800px — cobre celulares comuns com tela de alta densidade) e a original, para o navegador escolher pelo tamanho da tela */
export function srcsetDe(src: string, larguraOriginal: number) {
  if (larguraOriginal <= 800) return undefined
  return `${src.replace(/\.webp$/, "-800.webp")} 800w, ${src} ${larguraOriginal}w`
}

/** Largura da moldura dos projetos: tela cheia no celular, até 1216px no computador */
export const SIZES_MOLDURA = "(min-width: 768px) min(calc(100vw - 4rem), 1216px), calc(100vw - 2rem)"
