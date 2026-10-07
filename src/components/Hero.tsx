import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import Velaris from "@/components/ui/velaris"
import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Cursor, WhatsIcon } from "@/components/bits"
import { MaskReveal } from "@/components/fx"
import { linkWhatsApp } from "@/content"
import { shots } from "@/shots"

const CORES_FUNDO = ["#00788a", "#00d8ea", "#0b5f96", "#5ff0fb"]

const numeros = [
  { n: Object.values(shots).flat().filter((s) => !s.src.includes("capa")).length, rotulo: "telas desenhadas" },
  { n: 9, rotulo: "páginas no maior site" },
  { n: 100, suf: "%", rotulo: "feito sob medida" },
  { n: 0, rotulo: "templates prontos" },
]

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden pt-32 pb-16 md:pt-48 md:pb-28">
      {/* Fundo Velaris (21st.dev) nas cores da marca */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Velaris height="100%" bg="#04161b" colors={CORES_FUNDO} speed={4} grain={0.25} scale={1.2} sharpness={1.8} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <BlurFade delay={0.05}>
          <p className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
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

        <h1 className="font-wide max-w-5xl text-[clamp(2.05rem,9.6vw,2.6rem)] leading-[0.98] font-extrabold text-balance sm:text-6xl md:text-7xl lg:text-[5.4rem]">
          <MaskReveal delay={0.1}>
            Sites que fazem seu negócio parecer <span className="serif-accent font-normal text-cyan">do tamanho</span> que
            ele merece.
          </MaskReveal>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          <BlurFade delay={0.4} className="md:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-foreground/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] md:text-xl">
              Sites, landing pages e sistemas sob medida para empresas que querem transmitir confiança, vender mais e se
              destacar online.
            </p>
          </BlurFade>

          <BlurFade delay={0.5} className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:items-end md:justify-end">
            <a
              href={linkWhatsApp("Olá! Quero criar um projeto para o meu negócio.")}
              target="_blank"
              rel="noreferrer"
              className="btn-shine group inline-flex items-center justify-center gap-3 rounded-full bg-cyan px-7 py-4 font-semibold text-black transition hover:bg-white active:scale-[0.97]"
            >
              <WhatsIcon />
              Quero criar meu projeto
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#projetos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 py-4 font-medium backdrop-blur text-foreground transition hover:border-foreground/40 active:scale-[0.97]"
            >
              Ver projetos <ArrowDownRight className="h-4 w-4" />
            </a>
          </BlurFade>
        </div>

        <BlurFade delay={0.6}>
          <dl className="mt-16 grid grid-cols-2 border-t border-border md:mt-24 md:grid-cols-4">
            {numeros.map((item) => (
              <div key={item.rotulo} className="border-border py-6 pl-4 even:border-l md:[&:not(:first-child)]:border-l md:first:pl-0 [&:nth-child(1)]:pl-0 [&:nth-child(3)]:pl-0 md:[&:nth-child(3)]:pl-4"
              >
                <dt className="sr-only">{item.rotulo}</dt>
                <dd className="font-wide text-4xl font-bold md:text-5xl">
                  <NumberTicker value={item.n} className="text-foreground" />
                  {"suf" in item && <span className="text-cyan">{item.suf}</span>}
                </dd>
                <dd className="mt-2 flex items-center gap-2 text-sm text-foreground/85">
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
