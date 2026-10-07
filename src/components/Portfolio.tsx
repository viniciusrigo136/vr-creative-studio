import { useEffect, useState } from "react"
import { AnimatePresence, m } from "motion/react"
import { ArrowUpRight, X } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { Cursor, SectionHead, WhatsIcon } from "@/components/bits"
import { AutoScrollShot, Parallax, ShotSlides } from "@/components/fx"
import { linkWhatsApp, projetos, type Projeto } from "@/content"
import { shots } from "@/shots"
import { srcsetDe } from "@/lib/imagens"

/** Telas usadas na prévia animada: a página inicial inteira, ou as telas do sistema */
function telasDaPrevia(p: Projeto) {
  const todas = shots[p.id] ?? []
  const home = p.id === "ecocharge" ? todas.filter((s) => s.src.includes("home")) : todas
  return home.slice(0, 8)
}

function BrowserFrame({ p, alt, url }: { p: Projeto; alt: string; url: string }) {
  const telas = telasDaPrevia(p)
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition duration-500 group-hover:border-foreground/20">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-muted">{url}</span>
        <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold tracking-wider text-cyan uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          Ao vivo
        </span>
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        {p.telasSeparadas ? (
          <ShotSlides imagens={telas} alt={alt} />
        ) : telas.length ? (
          <AutoScrollShot imagens={telas} alt={alt} />
        ) : (
          <img src={p.capa} alt={alt} loading="lazy" decoding="async" width={1600} height={1000} className="h-full w-full object-cover object-left-top" />
        )}
      </div>
    </div>
  )
}

function Caso({ p, total, onOpen }: { p: Projeto; total: number; onOpen: () => void }) {
  const telas = shots[p.id]?.length ?? 0
  const verProjeto = (
    <button
      onClick={onOpen}
      className="group/btn inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-cyan hover:text-cyan active:scale-[0.97]"
    >
      Ver projeto
      <span className="text-muted">· {telas} {telas === 1 ? "tela" : "telas"}</span>
      <ArrowUpRight className="h-4 w-4 transition group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
    </button>
  )
  return (
    <article className="group border-t border-border py-16 md:py-24">
      <BlurFade inView inViewMargin="-80px">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.2em] uppercase">
              <span className="shrink-0 font-mono whitespace-nowrap text-muted">
                {p.numero} / {String(total).padStart(2, "0")}
              </span>
              <span className="h-px w-6 shrink-0 bg-border" />
              <span className="text-cyan">{p.tipo}</span>
            </p>
            <h3 className="font-wide mt-4 text-[2.1rem] leading-[0.95] font-extrabold md:text-6xl">{p.nome}</h3>
            <p className="mt-3 text-sm text-muted">{p.setor}</p>
          </div>
          <div className="hidden md:col-span-4 md:flex md:justify-end">{verProjeto}</div>
        </header>
      </BlurFade>

      <Parallax distancia={20} className="mt-8 md:mt-12">
        <m.button
          onClick={onOpen}
          className="relative block w-full cursor-zoom-in text-left transition-transform active:scale-[0.99]"
          // só recorte (sem opacidade): o texto da moldura nunca fica "apagado" com contraste baixo
          initial={{ clipPath: "inset(8% 6% 8% 6% round 16px)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Para leitores de tela o botão se chama "Abrir telas de …"; a moldura e o aviso são só visuais */}
          <span className="sr-only">Abrir telas de {p.nome}</span>
          <span aria-hidden="true" className="block">
            <BrowserFrame p={p} alt="" url={p.telasSeparadas ? `${p.nome} — sistema` : `${p.nome} — página inicial`} />
          </span>
          <span
            aria-hidden="true"
            className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur md:hidden"
          >
            Toque para ver tudo <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </m.button>
      </Parallax>

      <BlurFade inView inViewMargin="-60px">
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">Objetivo</p>
            <p className="mt-3 text-lg leading-snug text-foreground md:text-xl">{p.objetivo}</p>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">Solução</p>
            <p className="mt-3 leading-relaxed text-foreground/75">{p.solucao}</p>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">Principais recursos</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.entregas.map((e) => (
                <li key={e} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80">
                  <Cursor className="h-1.5 w-1.5" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 md:hidden [&>button]:w-full">{verProjeto}</div>
        {p.observacao && <p className="mt-6 text-xs text-muted/80">{p.observacao}</p>}
      </BlurFade>
    </article>
  )
}

function Visualizador({ p, onClose }: { p: Projeto; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const lista = shots[p.id] ?? []
  return (
    <m.div
      className="fixed inset-0 z-[70] flex flex-col bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Telas do projeto ${p.nome}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-4 md:px-8">
        <div className="min-w-0">
          <p className="truncate font-semibold">{p.nome}</p>
          <p className="truncate text-xs text-muted">
            {lista.length} {lista.length === 1 ? "tela" : "telas"} · role para ver {p.telasSeparadas ? "as telas" : "o site"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-foreground/40"
        >
          Fechar <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-6 md:px-8">
        <m.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={
            p.telasSeparadas
              ? "mx-auto flex max-w-5xl flex-col gap-6"
              : "mx-auto max-w-5xl overflow-hidden rounded-xl border border-border"
          }
        >
          {lista.map((s) => (
            <img
              key={s.src}
              src={s.src}
              srcSet={srcsetDe(s.src, s.w)}
              sizes="(min-width: 768px) min(calc(100vw - 4rem), 1024px), calc(100vw - 1.5rem)"
              decoding="async"
              width={s.w}
              height={s.h}
              loading="lazy"
              alt=""
              className={p.telasSeparadas ? "block h-auto w-full rounded-xl border border-border" : "block h-auto w-full"}
            />
          ))}
        </m.div>
        <div className="mx-auto mt-10 mb-6 flex max-w-5xl flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="font-wide text-2xl font-bold md:text-3xl">Quer um site assim para o seu negócio?</p>
          <a
            href={linkWhatsApp(`Olá! Vi o projeto ${p.nome} no seu site e quero algo parecido para o meu negócio.`)}
            target="_blank"
            rel="noreferrer"
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-cyan px-7 py-4 font-semibold text-black transition hover:bg-white active:scale-[0.97]"
          >
            <WhatsIcon /> Quero um site assim
          </a>
        </div>
      </div>
    </m.div>
  )
}

export function Portfolio() {
  const [aberto, setAberto] = useState<Projeto | null>(null)
  return (
    <section id="projetos" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-28 md:px-8 md:py-40">
      <SectionHead
        index="01"
        label="Projetos"
        title={
          <>
            Projetos reais, para <span className="serif-accent font-normal text-cyan">negócios</span> diferentes.
          </>
        }
        aside="Cada projeto começou com um objetivo de negócio. Toque em qualquer um para percorrer as telas como se estivesse navegando."
      />
      <div className="mt-10">
        {projetos.map((p) => (
          <Caso key={p.id} p={p} total={projetos.length} onOpen={() => setAberto(p)} />
        ))}
      </div>
      <AnimatePresence>{aberto && <Visualizador p={aberto} onClose={() => setAberto(null)} />}</AnimatePresence>
    </section>
  )
}
