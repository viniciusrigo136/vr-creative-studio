import { useEffect, useRef, useState, type CSSProperties } from "react"
import {
  AnimatePresence,
  m,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react"
import { ArrowUpRight, X } from "lucide-react"
import { Cursor, SectionHead, WhatsIcon } from "@/components/bits"
import { AutoScrollShot, ShotSlides } from "@/components/fx"
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
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] md:rounded-b-none">
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

/* Cartão do projeto. Os cartões "grudam" no topo e empilham: cada um desliza por cima do anterior,
   que encolhe um pouco e fica para trás. */
function Cartao({
  p,
  i,
  total,
  progresso,
  onOpen,
}: {
  p: Projeto
  i: number
  total: number
  progresso: MotionValue<number>
  onOpen: () => void
}) {
  const reduzir = useReducedMotion()
  const telas = shots[p.id]?.length ?? 0
  // Quanto mais antigo na pilha, menor fica — dá a sensação de profundidade
  const escalaFinal = 1 - (total - 1 - i) * 0.035
  const scale = useTransform(progresso, [i / total, 1], [1, escalaFinal])
  const brilho = useTransform(progresso, [i / total, 1], [1, 1 - (total - 1 - i) * 0.09])
  const filter = useMotionTemplate`brightness(${brilho})`

  return (
    <div
      className="top-[calc(1rem+var(--i)*0.5rem)] md:top-[calc(5.5rem+var(--i)*0.9rem)] [@media(min-height:640px)]:sticky"
      style={{ "--i": i } as CSSProperties}
    >
      <m.article
        style={{ ...(reduzir ? {} : { scale, filter }), "--cor": p.cor } as MotionStyle}
        className="group relative grid origin-top overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)] grid-cols-1 md:min-h-[35rem] md:grid-cols-12"
      >
        {/* Luz na cor do cliente */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_90%_0%,color-mix(in_oklab,var(--cor)_26%,transparent),transparent_70%)]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--cor) to-transparent opacity-60" />

        {/* Prévia: em cima no celular, à direita no computador (sangrando para fora do cartão) */}
        <div className="relative min-w-0 md:order-2 md:col-span-7 md:flex md:items-end md:pt-12 md:pr-10 lg:pr-12">
          <button
            onClick={onOpen}
            className="relative block w-full cursor-zoom-in text-left transition-transform duration-500 ease-out active:scale-[0.99] md:translate-y-6 md:group-hover:translate-y-2"
          >
            <span className="sr-only">Abrir telas de {p.nome}</span>
            <span aria-hidden="true" className="block">
              <BrowserFrame p={p} alt="" url={p.telasSeparadas ? `${p.nome} — sistema` : `${p.nome} — página inicial`} />
            </span>
            <span
              aria-hidden="true"
              className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur md:right-4 md:bottom-10 md:translate-y-2 md:opacity-0 md:transition md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            >
              Ver todas as telas <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>

        <div className="relative flex min-w-0 flex-col p-5 pt-5 md:order-1 md:col-span-5 md:p-10 lg:p-12">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-[0.18em] uppercase md:text-xs">
            <span className="shrink-0 font-mono whitespace-nowrap text-muted">
              {p.numero} / {String(total).padStart(2, "0")}
            </span>
            <span className="h-px w-6 shrink-0 bg-white/15" />
            <span className="text-(--cor)">{p.tipo}</span>
          </p>
          <h3 className="font-wide mt-3 text-[1.7rem] leading-[0.98] font-extrabold md:mt-5 md:text-4xl lg:text-5xl">{p.nome}</h3>
          <p className="mt-2 hidden text-sm text-muted md:block">{p.setor}</p>
          <p className="mt-3 line-clamp-3 text-[15px] leading-snug text-foreground/85 md:mt-6 md:line-clamp-none md:text-lg">{p.objetivo}</p>
          <ul className="mt-6 hidden flex-wrap gap-2 md:flex">
            {p.entregas.slice(0, 4).map((e) => (
              <li key={e} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/80">
                <span className="h-1 w-1 rounded-full bg-(--cor)" />
                {e}
              </li>
            ))}
          </ul>
          <div className="mt-5 md:mt-auto md:pt-8">
            <button
              onClick={onOpen}
              className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-(--cor) active:scale-[0.97] md:w-auto"
            >
              Ver projeto
              <span className="font-normal text-black/55">· {telas} {telas === 1 ? "tela" : "telas"}</span>
              <ArrowUpRight className="h-4 w-4 transition group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </m.article>
    </div>
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
        <div className="mx-auto mb-6 grid max-w-5xl gap-6 rounded-2xl border border-border bg-surface p-5 md:grid-cols-12 md:gap-8 md:p-8">
          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">Objetivo</p>
            <p className="mt-2 leading-snug text-foreground md:text-lg">{p.objetivo}</p>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">Solução</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/75 md:text-base">{p.solucao}</p>
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
          {p.observacao && <p className="text-xs text-muted/80 md:col-span-12">{p.observacao}</p>}
        </div>
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
  const pilha = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: pilha, offset: ["start start", "end end"] })
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
        aside="Cada projeto começou com um objetivo de negócio. Role para passar por eles e toque em qualquer um para ver todas as telas."
      />
      <div ref={pilha} className="mt-12 flex flex-col gap-6 md:mt-20 md:gap-10">
        {projetos.map((p, i) => (
          <Cartao key={p.id} p={p} i={i} total={projetos.length} progresso={scrollYProgress} onOpen={() => setAberto(p)} />
        ))}
      </div>
      <AnimatePresence>{aberto && <Visualizador p={aberto} onClose={() => setAberto(null)} />}</AnimatePresence>
    </section>
  )
}
