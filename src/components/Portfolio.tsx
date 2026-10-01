import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, X } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { SectionHead } from "@/components/bits"
import { projetos, type Projeto } from "@/content"
import { shots } from "@/shots"

function BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-muted">{url}</span>
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover object-left-top transition duration-[1.6s] ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  )
}

function Caso({ p, i, onOpen }: { p: Projeto; i: number; onOpen: () => void }) {
  const invert = i % 2 === 1
  const telas = shots[p.id]?.length ?? 0
  return (
    <BlurFade inView inViewMargin="-80px">
      <article className="group grid items-center gap-6 border-t border-border py-10 md:grid-cols-12 md:gap-12 md:py-20">
        <div className={`md:col-span-5 ${invert ? "md:order-2" : "md:order-1"}`}>
          <div className="flex items-baseline gap-4">
            <span className="font-wide text-5xl font-extrabold text-white/10 md:text-8xl">{p.numero}</span>
            <span className="text-xs font-semibold tracking-[0.2em] text-cyan uppercase">{p.tipo}</span>
          </div>
          <h3 className="font-wide mt-3 text-[1.75rem] leading-tight font-bold md:mt-4 md:text-4xl">{p.nome}</h3>
          <p className="mt-1 text-sm text-muted">{p.setor}</p>
          <p className="mt-4 leading-relaxed text-foreground/80 md:mt-6">{p.resumo}</p>
          <ul className="mt-5 flex flex-wrap gap-2 md:mt-6">
            {p.entregas.map((e) => (
              <li key={e} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                {e}
              </li>
            ))}
          </ul>
          <button
            onClick={onOpen}
            className="mt-6 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-cyan/40 px-5 text-sm font-semibold text-foreground transition hover:border-cyan hover:text-cyan active:scale-[0.98] md:mt-8 md:min-h-0 md:w-auto md:justify-start md:rounded-none md:border-0 md:border-b md:px-0 md:pb-1"
          >
            Ver {telas > 1 ? `as ${telas} telas` : "a tela"} do projeto <ArrowUpRight className="h-4 w-4" />
          </button>
          {p.observacao && <p className="mt-4 text-xs text-muted/80">{p.observacao}</p>}
        </div>
        <button
          onClick={onOpen}
          aria-label={`Abrir telas de ${p.nome}`}
          className={`relative order-first cursor-zoom-in text-left md:col-span-7 ${invert ? "md:order-1" : "md:order-2"}`}
        >
          <BrowserFrame src={p.capa} alt={`Página inicial do projeto ${p.nome}`} url={p.telasSeparadas ? `${p.nome} — sistema` : `${p.nome} — página inicial`} />
          <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur md:hidden">
            Toque para ver {telas > 1 ? `as ${telas} telas` : "a tela"}
          </span>
        </button>
      </article>
    </BlurFade>
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
    <motion.div
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
        <motion.div
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
              width={s.w}
              height={s.h}
              loading="lazy"
              alt=""
              className={p.telasSeparadas ? "block h-auto w-full rounded-xl border border-border" : "block h-auto w-full"}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  const [aberto, setAberto] = useState<Projeto | null>(null)
  return (
    <section id="trabalhos" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-32">
      <SectionHead
        index="01"
        label="Trabalhos"
        title={
          <>
            Cinco projetos, <span className="serif-accent font-normal text-cyan">cinco caras</span> diferentes.
          </>
        }
        aside="Prints reais dos sites publicados. Clique em qualquer projeto para percorrer as telas como se estivesse navegando."
      />
      <div className="mt-10">
        {projetos.map((p, i) => (
          <Caso key={p.id} p={p} i={i} onOpen={() => setAberto(p)} />
        ))}
      </div>
      <AnimatePresence>{aberto && <Visualizador p={aberto} onClose={() => setAberto(null)} />}</AnimatePresence>
    </section>
  )
}
