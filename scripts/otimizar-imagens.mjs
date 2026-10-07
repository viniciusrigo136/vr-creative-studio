// Gera versões leves das imagens para o celular.
// Rode depois de adicionar ou trocar prints:  npm run imagens
// - public/portfolio/X.webp  →  public/portfolio/X-800.webp (usada no celular via srcset)
// - logos PNG                →  WebP no tamanho em que aparecem na tela (2x para telas retina)
import { readdir, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const raiz = path.resolve(import.meta.dirname, "..", "public")
const LARGURA_CELULAR = 800

async function desatualizado(origem, destino) {
  try {
    return (await stat(destino)).mtimeMs < (await stat(origem)).mtimeMs
  } catch {
    return true
  }
}

async function gerar(origem, destino, redimensionar, qualidade = 75) {
  if (!(await desatualizado(origem, destino))) return
  await sharp(origem).resize(redimensionar).webp({ quality: qualidade }).toFile(destino)
  console.log("✓", path.relative(raiz, destino))
}

const pasta = path.join(raiz, "portfolio")
for (const nome of await readdir(pasta)) {
  if (!nome.endsWith(".webp") || nome.endsWith(`-${LARGURA_CELULAR}.webp`)) continue
  const origem = path.join(pasta, nome)
  await gerar(origem, origem.replace(/\.webp$/, `-${LARGURA_CELULAR}.webp`), { width: LARGURA_CELULAR, withoutEnlargement: true }, 72)
}

// Logo do menu: aparece com até 32px de altura → 64px
await gerar(path.join(raiz, "brand/logo-mark.png"), path.join(raiz, "brand/logo-mark.webp"), { height: 64 }, 85)
// Logo do rodapé: aparece com 160px de largura → 320px
await gerar(path.join(raiz, "brand/logo-full.png"), path.join(raiz, "brand/logo-full.webp"), { width: 320 }, 85)
