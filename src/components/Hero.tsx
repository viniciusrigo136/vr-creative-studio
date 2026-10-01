import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import Velaris from "@/components/ui/velaris"
import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { WordRotate } from "@/components/ui/word-rotate"
import { Cursor, WhatsIcon } from "@/components/bits"
import { linkWhatsApp, projetos } from "@/content"
import { shots } from "@/shots"

const CORES_FUNDO = ["#00788a", "#00d8ea", "#0b5f96", "#5ff0fb"]

const numeros = [
  { n: projetos.length, rotulo: "projetos publicados" },
  { n: Object.values(shots).flat().length, rotulo: "telas desenhadas" },
  { n: 9, rotulo: "páginas no maior site" },
  { n: 4, rotulo: "segmentos atendidos" },
]

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden pt-24 pb-12 sm:pt-32 md:pt-44 md:pb-24">
      {/* Fundo Velaris (21st.dev) nas cores da marca */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Velaris height="100%" bg="#04161b" colors={CORES_FUNDO} speed={4} grain={0.25} scale={1.2} sharpness={1.8} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <BlurFade delay={0.05}>
          <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:mb-8 text-foreground/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              Agenda aberta para novos projetos
            </span>
            <span>Vinicius Rigo · sites e sistemas com IA</span>
          </p>
        </BlurFade>

        <BlurFade delay={0.15}>
          <h1 className="font-wide max-w-6xl text-[clamp(2.15rem,10.2vw,2.9rem)] leading-[0.95] font-extrabold sm:text-6xl md:text-[5.6rem] lg:text-[6.6rem]">
            Sites sob medida
            <br />
            <span className="text-[#bdf6fb]">que</span>{" "}
            {/* no celular a palavra fica numa linha com altura fixa: o texto abaixo não "pula" */}
            <span className="block h-[1.3em] whitespace-nowrap sm:inline sm:h-auto">
              <WordRotate
                className="text-cyan"
                duration={2600}
                words={["vendem.", "agendam.", "captam leads.", "convencem.", "aparecem."]}
              />
            </span>
          </h1>
        </BlurFade>

        <div className="mt-6 grid gap-8 md:mt-14 md:gap-10 md:grid-cols-12">
          <BlurFade delay={0.3} className="md:col-span-6">
            <p className="max-w-xl text-[1.05rem] leading-relaxed text-foreground/90 sm:text-lg [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] md:text-xl">
              Uso inteligência artificial para chegar{" "}
              <span className="serif-accent text-[1.35rem] text-foreground sm:text-2xl md:text-[1.6rem]">mais rápido</span> ao resultado — não
              para entregar mais um site genérico. Cada projeto tem estrutura, texto e acabamento pensados para o seu
              negócio.
            </p>
          </BlurFade>

          <BlurFade delay={0.4} className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:items-end md:justify-end">
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-cyan px-7 py-4 text-[1.05rem] font-semibold text-black transition hover:bg-white active:scale-[0.98]"
            >
              <WhatsIcon />
              Quero um site
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#trabalhos"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-background/40 px-7 py-4 font-medium text-foreground backdrop-blur transition hover:border-foreground/40 active:scale-[0.98]"
            >
              Ver projetos <ArrowDownRight className="h-4 w-4" />
            </a>
          </BlurFade>
        </div>

        <BlurFade delay={0.5}>
          <dl className="mt-10 grid grid-cols-2 border-t border-white/10 md:mt-24 md:grid-cols-4">
            {numeros.map((item) => (
              <div key={item.rotulo} className="border-border py-5 pl-4 even:border-l md:py-6 md:[&:not(:first-child)]:border-l md:first:pl-0 [&:nth-child(1)]:pl-0 [&:nth-child(3)]:pl-0 md:[&:nth-child(3)]:pl-4"
              >
                <dt className="sr-only">{item.rotulo}</dt>
                <dd className="font-wide text-[2.1rem] leading-none font-bold md:text-5xl">
                  <NumberTicker value={item.n} className="text-foreground" />
                </dd>
                <dd className="mt-2 flex items-center gap-2 text-[13px] text-foreground/85 md:text-sm">
                  <Cursor className="h-2 w-2" />
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
