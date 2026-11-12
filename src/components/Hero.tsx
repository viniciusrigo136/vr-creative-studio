import { useRef, type PointerEvent } from "react"
import { m, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Cursor, WhatsIcon } from "@/components/bits"
import { cn } from "@/lib/utils"
import { linkWhatsApp, projetos } from "@/content"
import { shots } from "@/shots"

const numeros = [
  { n: Object.values(shots).flat().filter((s) => !s.src.includes("capa")).length, rotulo: "telas desenhadas" },
  { n: 9, rotulo: "páginas no maior site" },
  { n: 100, suf: "%", rotulo: "feito sob medida" },
  { n: 0, rotulo: "templates prontos" },
]

/* Telas que passam na parede do topo — três colunas, misturando os projetos.
   Usa a versão leve (-800) de cada print: cada tela aparece com ~260px de largura. */
const COLUNAS = [
  ["27-ecocharge-home", "pontobom-capa", "13-elbratec-completo", "24-balen-completo"],
  ["01-gimo-completo", "20-balen-completo", "38-ecocharge-produtos", "65-pontobom-ordens-servico"],
  ["11-elbratec-completo", "04-gimo-completo", "67-pontobom-vendas", "31-ecocharge-home"],
]
const DURACOES = [46, 58, 40]

const EASE = [0.22, 1, 0.36, 1] as const

function Tela({ nome }: { nome: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </div>
      <img
        src={`portfolio/${nome}-800.webp`}
        alt=""
        width={800}
        height={500}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-left-top"
      />
    </div>
  )
}

/** Parede inclinada com as telas dos projetos subindo e descendo; no computador acompanha o mouse */
function ParedeDeTelas({ mx, my, ativa }: { mx: ReturnType<typeof useMotionValue<number>>; my: ReturnType<typeof useMotionValue<number>>; ativa: boolean }) {
  const reduzir = useReducedMotion()
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-24, -12]), { stiffness: 60, damping: 18 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [26, 14]), { stiffness: 60, damping: 18 })
  const rodando = ativa && !reduzir

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative -mx-4 mt-12 h-72 overflow-hidden sm:h-96 md:-mx-8",
        "[mask-image:linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)]",
        "lg:absolute lg:inset-y-0 lg:right-0 lg:left-[48%] lg:-z-[5] lg:mx-0 lg:mt-0 lg:h-auto",
      )}
    >
      <div className="absolute inset-0 lg:[mask-image:linear-gradient(to_right,transparent_10%,black_58%)]">
        <div className="parede-escala absolute inset-0 [perspective:1400px]">
          <m.div
            style={{ x: "-50%", y: "-50%", rotateX, rotateY, rotateZ: 7 }}
            className="absolute top-1/2 left-1/2 grid h-[1150px] w-[880px] grid-cols-3 gap-5 lg:left-[64%]"
          >
            {COLUNAS.map((col, c) => (
              <div
                key={c}
                className="flex flex-col gap-(--gap) overflow-hidden [--gap:1.25rem]"
                style={{ "--duration": `${DURACOES[c]}s` } as React.CSSProperties}
              >
                {[0, 1, 2].map((copia) => (
                  <div
                    key={copia}
                    className={cn("animate-marquee-vertical flex shrink-0 flex-col gap-(--gap)", c === 1 && "[animation-direction:reverse]")}
                    style={{ animationPlayState: rodando ? "running" : "paused" }}
                  >
                    {col.map((nome) => (
                      <Tela key={nome} nome={nome} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </m.div>
        </div>
      </div>
    </div>
  )
}

/** Título que entra palavra por palavra, subindo de dentro de uma máscara */
function Titulo() {
  const palavras: { t: string; destaque?: boolean }[] = [
    ..."Sites que fazem seu negócio parecer".split(" ").map((t) => ({ t })),
    { t: "do tamanho", destaque: true },
    ..."que ele merece.".split(" ").map((t) => ({ t })),
  ]
  return (
    <h1 className="font-wide max-w-5xl text-[clamp(2.05rem,9.6vw,2.6rem)] leading-[0.98] font-extrabold text-balance sm:text-6xl md:text-7xl lg:max-w-[45rem] lg:text-[4.6rem] xl:text-[4.9rem]">
      {palavras.map((p, i) => (
        <span key={i}>
          <span className="-mx-[0.08em] -mb-[0.14em] inline-block overflow-hidden px-[0.08em] pb-[0.14em] align-bottom">
            <m.span
              className={cn("inline-block", p.destaque && "serif-accent font-normal text-cyan")}
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.75, delay: 0.1 + i * 0.055, ease: EASE }}
            >
              {p.t}
            </m.span>
          </span>{" "}
        </span>
      ))}
    </h1>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const naTela = useInView(ref)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  function aoMover(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section
      id="topo"
      ref={ref}
      onPointerMove={aoMover}
      className="relative isolate overflow-hidden pt-28 pb-12 md:pt-40 md:pb-20"
    >
      {/* Fundo: luzes nas cores da marca derivando devagar (CSS puro, sem WebGL) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#04121a]">
        <div className="luz top-[-10%] left-[-10%] h-[55%] w-[55%] bg-cyan-deep/45 [--dx:12%] [--dy:10%]" />
        <div className="luz right-[-5%] bottom-[5%] h-[60%] w-[50%] bg-cyan/30 [--dx:-10%] [--dy:-12%] [animation-duration:24s]" />
        <div className="luz top-[10%] right-[20%] h-[35%] w-[30%] bg-[#0b5f96]/50 [--dx:-14%] [--dy:14%] [animation-duration:21s]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <BlurFade delay={0.05}>
          <p className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/85">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              Agenda aberta para novos projetos
            </span>
            <span>Estúdio digital · Vinicius Rigo</span>
          </p>
        </BlurFade>

        <Titulo />

        <BlurFade delay={0.55}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/85 md:mt-10 md:text-xl">
            Sites, landing pages e sistemas sob medida para empresas que querem transmitir confiança, vender mais e se
            destacar online.
          </p>
        </BlurFade>

        <BlurFade delay={0.65} className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
          <a
            href={linkWhatsApp("Olá! Quero criar um projeto para o meu negócio.")}
            target="_blank"
            rel="noreferrer"
            className="btn-shine group inline-flex items-center justify-center gap-3 rounded-full bg-cyan px-7 py-4 font-semibold text-black shadow-[0_12px_40px_-8px_rgba(0,237,253,0.55)] transition hover:bg-white active:scale-[0.97]"
          >
            <WhatsIcon />
            Quero criar meu projeto
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#projetos"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-background/40 px-7 py-4 font-medium text-foreground backdrop-blur transition hover:border-foreground/40 active:scale-[0.97]"
          >
            Ver os {projetos.length} projetos <ArrowDownRight className="h-4 w-4" />
          </a>
        </BlurFade>

        <ParedeDeTelas mx={mx} my={my} ativa={naTela} />

        <BlurFade delay={0.75}>
          <dl className="mt-10 grid grid-cols-2 border-t border-white/10 md:mt-20 md:grid-cols-4 lg:max-w-[45rem]">
            {numeros.map((item) => (
              <div
                key={item.rotulo}
                className="border-white/10 py-5 pl-4 even:border-l md:first:pl-0 md:[&:not(:first-child)]:border-l [&:nth-child(1)]:pl-0 [&:nth-child(3)]:pl-0 md:[&:nth-child(3)]:pl-4"
              >
                <dt className="sr-only">{item.rotulo}</dt>
                <dd className="font-wide text-3xl font-bold md:text-4xl">
                  <NumberTicker value={item.n} className="text-foreground" />
                  {"suf" in item && <span className="text-cyan">{item.suf}</span>}
                </dd>
                <dd className="mt-2 flex items-center gap-2 text-[13px] text-foreground/80">
                  <Cursor className="h-2 w-2 shrink-0" />
                  {item.rotulo}
                </dd>
              </div>
            ))}
          </dl>
        </BlurFade>
      </div>
    </section>
  )
}
