import { useRef, useState, type FormEvent } from "react"
import { AnimatePresence, m, useInView, useScroll, useSpring } from "motion/react"
import { ArrowUpRight, Check, Mail, Plus, Quote } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { Marquee } from "@/components/ui/marquee"
import { Cursor, SectionHead, WhatsIcon } from "@/components/bits"
import { MaskReveal, SnapRow } from "@/components/fx"
import { srcsetDe } from "@/lib/imagens"
import {
  clientes,
  contato,
  depoimentos,
  diferenciais,
  etapas,
  linkWhatsApp,
  pacotes,
  perguntas,
  servicos,
} from "@/content"

/** Entrada suave de itens de lista (fade + leve subida), em sequência */
const surgir = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, delay: 0.05 * i, ease: "easeOut" as const },
})

/* ───────────── Faixa de segmentos ───────────── */
const segmentos = [
  "Mobilidade elétrica",
  "Energia solar",
  "Barbearias",
  "Assistência técnica",
  "Franquias",
  "Indústria",
  "Comércio local",
  "Prestadores de serviço",
]

export function Faixa() {
  return (
    <div className="relative border-y border-border bg-surface/60 py-5">
      <Marquee pauseOnHover className="[--duration:38s] [--gap:3rem]">
        {segmentos.map((s) => (
          <span key={s} className="font-wide flex items-center gap-12 text-xl font-semibold whitespace-nowrap text-foreground/70 md:text-2xl">
            {s}
            <Cursor className="h-3.5 w-3.5" />
          </span>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background" />
    </div>
  )
}

/* ───────────── Vitrine com scroll 3D ───────────── */
export function Vitrine() {
  return (
    <section className="overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <p className="mb-4 text-sm tracking-[0.2em] text-muted uppercase">Isto não é um template</p>
            <h2 className="font-wide text-4xl leading-[0.95] font-extrabold md:text-7xl">
              Nove páginas, <br />
              <span className="serif-accent font-normal text-cyan">uma marca inteira.</span>
            </h2>
            <p className="mx-auto mt-6 mb-16 max-w-xl text-muted">
              O site da Elbratec EcoCharge foi pensado do catálogo ao cadastro de revendedor — role para ver.
            </p>
          </>
        }
      >
        <div className="h-full w-full overflow-hidden">
          <img
            src="portfolio/27-ecocharge-home.webp"
            srcSet={srcsetDe("portfolio/27-ecocharge-home.webp", 1348)}
            sizes="(min-width: 768px) 1024px, 100vw"
            width={1348}
            height={774}
            decoding="async"
            alt="Página inicial do site Elbratec EcoCharge"
            className="h-full w-full object-cover object-left-top"
            loading="lazy"
          />
        </div>
      </ContainerScroll>
    </section>
  )
}

/* ───────────── Por que a VR Creative ───────────── */
export function Diferenciais() {
  return (
    <section id="diferenciais" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-28 md:px-8 md:py-40">
      <SectionHead
        index="02"
        label="Diferenciais"
        title={
          <>
            Por que a <span className="serif-accent font-normal text-cyan">VR Creative.</span>
          </>
        }
        aside="Um estúdio pequeno de propósito: menos projetos ao mesmo tempo, mais atenção em cada um."
      />
      <ol className="mt-14 grid md:mt-20 md:grid-cols-2 md:gap-x-16">
        {diferenciais.map((d, i) => (
            <m.li key={d.titulo} {...surgir(i)} className="group relative border-t border-border py-8 md:py-10">
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-cyan transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <div className="flex gap-5 md:gap-8">
                <span className="pt-1 font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-wide text-2xl leading-tight font-bold md:text-3xl">{d.titulo}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{d.texto}</p>
                </div>
              </div>
            </m.li>
        ))}
      </ol>
    </section>
  )
}

/* ───────────── Serviços ───────────── */
export function Servicos() {
  return (
    <section id="servicos" className="scroll-mt-16 border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
        <SectionHead
          index="03"
          label="Serviços"
          title={
            <>
              O que eu <span className="serif-accent font-normal text-cyan">construo</span> para você.
            </>
          }
          aside="Do cartão de visita digital ao sistema com login. Se não estiver na lista, pergunte — muita coisa cabe aqui."
        />
        <ul className="mt-14 border-b border-border md:mt-20">
          {servicos.map((s, i) => (
              <m.li key={s.titulo} {...surgir(i)} className="group grid gap-3 border-t border-border py-7 transition-colors duration-500 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10 md:hover:bg-white/[0.02]">
                <div className="flex items-center justify-between md:col-span-1 md:block">
                  <span className="font-mono text-xs text-muted transition-colors group-hover:text-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] tracking-[0.18em] text-muted uppercase md:hidden">{s.tag}</span>
                </div>
                <h3 className="font-wide text-[1.7rem] leading-tight font-bold transition duration-500 md:col-span-5 md:text-4xl md:group-hover:translate-x-2 md:group-hover:text-cyan">
                  {s.titulo}
                </h3>
                <p className="leading-relaxed text-muted md:col-span-5">{s.texto}</p>
                <span className="hidden text-right text-[11px] tracking-[0.18em] text-muted uppercase md:col-span-1 md:block">
                  {s.tag}
                </span>
              </m.li>
          ))}
        </ul>
        <p className="mt-10 text-muted">
          Tem uma ideia diferente?{" "}
          <a
            href={linkWhatsApp("Olá! Tenho uma ideia de projeto e queria saber se você faz.")}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-foreground underline decoration-cyan/50 underline-offset-4 transition hover:text-cyan hover:decoration-cyan"
          >
            Conte para mim
          </a>
          .
        </p>
      </div>
    </section>
  )
}

/* ───────────── Processo ───────────── */
function LinhaDoTempo() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] })
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <ol ref={ref} className="relative mt-14 md:hidden">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-border" />
      <m.span
        aria-hidden="true"
        style={{ scaleY: progresso }}
        className="absolute top-2 bottom-2 left-[1.375rem] w-px origin-top bg-cyan"
      />
      {etapas.map((e, i) => (
        <m.li
          key={e.titulo}
          className="relative pb-10 pl-16 last:pb-0"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <m.span
            className="font-wide absolute top-0 left-0 grid h-11 w-11 place-items-center rounded-full border bg-background text-lg font-extrabold"
            initial={{ borderColor: "#1f2328", color: "#8b939c" }}
            whileInView={{ borderColor: "#00edfd", color: "#00edfd" }}
            viewport={{ once: true, margin: "-35% 0px" }}
            transition={{ duration: 0.4 }}
          >
            {i + 1}
          </m.span>
          <h3 className="pt-2 text-lg font-semibold">{e.titulo}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{e.texto}</p>
        </m.li>
      ))}
    </ol>
  )
}

export function Processo() {
  return (
    <section id="processo" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-28 md:px-8 md:py-40">
      <SectionHead
        index="04"
        label="Processo"
        title={
          <>
            Do primeiro contato ao <span className="serif-accent font-normal text-cyan">site no ar.</span>
          </>
        }
        aside="Você fala comigo do começo ao fim — sem atendente, sem ticket, sem repassar o projeto para terceiros."
      />
      <LinhaDoTempo />
      <div className="mt-20 hidden gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid md:grid-cols-4">
        {etapas.map((e, i) => (
          <BlurFade key={e.titulo} inView delay={0.08 * i} className="h-full">
            <div className="group flex h-full flex-col bg-background p-8 transition-colors duration-500 hover:bg-surface md:min-h-80">
              <span className="font-wide text-5xl font-extrabold text-cyan transition-transform duration-500 group-hover:-translate-y-1">
                {i + 1}
              </span>
              <h3 className="mt-auto pt-12 text-lg font-semibold">{e.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{e.texto}</p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  )
}

/* ───────────── Clientes / prova social ───────────── */
export function Clientes() {
  return (
    <section id="clientes" className="scroll-mt-16 border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
        <SectionHead
          index="05"
          label="Clientes"
          title={
            <>
              Quem já está <span className="serif-accent font-normal text-cyan">no ar</span> com a VR.
            </>
          }
          aside="Indústria, franquias, energia, serviços locais e assistência técnica — cada um com um projeto pensado do zero."
        />
        <BlurFade inView>
          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-20 md:grid-cols-5">
            {clientes.map((c) => (
              <li
                key={c.nome}
                className="group grid min-h-28 place-items-center bg-background px-4 py-8 text-center transition-colors duration-500 last:odd:col-span-2 hover:bg-surface md:min-h-36 md:last:odd:col-span-1"
              >
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt={c.nome}
                    loading="lazy"
                    className="max-h-10 w-auto opacity-60 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="font-wide text-sm font-bold tracking-[0.12em] text-foreground/55 uppercase transition-colors duration-500 group-hover:text-foreground md:text-base">
                    {c.nome}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </BlurFade>

        {depoimentos.length > 0 && (
          <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3">
            {depoimentos.slice(0, 3).map((d, i) => (
              <BlurFade key={d.nome} inView delay={0.08 * i}>
                <figure className="flex h-full flex-col border-t border-border pt-8">
                  <Quote className="h-5 w-5 text-cyan" aria-hidden="true" />
                  <blockquote className="mt-5 text-lg leading-relaxed text-foreground/90">“{d.texto}”</blockquote>
                  <figcaption className="mt-auto pt-6 text-sm">
                    <span className="font-semibold">{d.nome}</span>
                    <span className="text-muted"> · {d.empresa}</span>
                  </figcaption>
                </figure>
              </BlurFade>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ───────────── Pacotes ───────────── */

/** O brilho da borda roda em JavaScript a cada quadro: só liga quando o cartão está na tela */
function BeamQuandoVisivel() {
  const ref = useRef<HTMLSpanElement>(null)
  const visivel = useInView(ref, { margin: "100px" })
  return (
    <>
      <span ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      {visivel && <BorderBeam size={120} duration={8} colorFrom="#00edfd" colorTo="#ffffff" borderWidth={1.5} />}
    </>
  )
}

export function Pacotes() {
  const recomendado = Math.max(0, pacotes.findIndex((p) => p.destaque))
  return (
    <section id="pacotes" className="mx-auto max-w-7xl scroll-mt-16 overflow-hidden px-4 py-28 md:px-8 md:py-40">
      <SectionHead
        index="06"
        label="Pacotes"
        title={
          <>
            Escolha um ponto de <span className="serif-accent font-normal text-cyan">partida.</span>
          </>
        }
        aside="Cada orçamento é montado para o seu caso. Os pacotes servem de referência para a nossa primeira conversa."
      />
      <BlurFade inView className="mt-14 md:mt-20">
        <SnapRow rotulo="Pacotes" inicial={recomendado} className="items-stretch pt-3 sm:gap-4 lg:grid-cols-3">
          {pacotes.map((p) => (
            <div key={p.nome} className="h-full">
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition duration-500 md:p-9 lg:hover:-translate-y-1 ${
                  p.destaque ? "border-cyan/30 bg-surface-2" : "border-border bg-surface lg:hover:border-foreground/20"
                }`}
              >
                {p.destaque && (
                  <>
                    <BeamQuandoVisivel />
                    <span className="absolute top-7 right-7 rounded-full bg-cyan px-3 py-1 text-[11px] font-bold tracking-wide text-black uppercase md:top-9 md:right-9">
                      Recomendado
                    </span>
                  </>
                )}
                <h3 className="font-wide pr-28 text-2xl font-bold">{p.nome}</h3>
                <p className="mt-2 max-w-[26ch] text-sm text-muted">{p.para}</p>
                <ul className="mt-8 space-y-3 border-t border-border pt-8">
                  {p.itens.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={linkWhatsApp(`Olá! ${p.cta}. Pode me passar um orçamento?`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-center text-sm font-semibold transition active:scale-[0.97] ${
                    p.destaque ? "btn-shine bg-cyan text-black hover:bg-white" : "border border-border hover:border-foreground/40"
                  }`}
                  style={{ marginTop: "2.5rem" }}
                >
                  {p.cta} <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </SnapRow>
      </BlurFade>
    </section>
  )
}

/* ───────────── Perguntas ───────────── */
function Pergunta({ p, r, aberta, onToggle }: { p: string; r: string; aberta: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={aberta}
        className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left text-lg font-medium transition-colors md:text-xl"
      >
        <span className={aberta ? "text-foreground" : "text-foreground/90"}>{p}</span>
        <m.span
          animate={{ rotate: aberta ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors ${
            aberta ? "border-cyan bg-cyan text-black" : "border-border text-cyan"
          }`}
        >
          <Plus className="h-4 w-4" />
        </m.span>
      </button>
      <AnimatePresence initial={false}>
        {aberta && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 leading-relaxed text-muted">{r}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Perguntas() {
  const [aberta, setAberta] = useState<number | null>(0)
  return (
    <section id="duvidas" className="mx-auto max-w-7xl scroll-mt-16 px-4 pb-28 md:px-8 md:pb-40">
      <SectionHead index="07" label="Dúvidas" title="Perguntas que sempre aparecem." />
      <div className="mt-12 md:mt-16 md:ml-[25%]">
        {perguntas.map((q, i) => (
          <Pergunta key={q.p} p={q.p} r={q.r} aberta={aberta === i} onToggle={() => setAberta(aberta === i ? null : i)} />
        ))}
        <p className="mt-8 text-sm text-muted">
          Ficou alguma dúvida?{" "}
          <a
            href={linkWhatsApp("Olá! Tenho uma dúvida sobre os sites.")}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-cyan underline-offset-4 hover:underline"
          >
            Pergunte direto no WhatsApp →
          </a>
        </p>
      </div>
    </section>
  )
}

/* ───────────── Contato ───────────── */
const tipos = ["Landing page", "Site institucional", "Catálogo de produtos", "Agendamento online", "Sistema sob medida", "Ainda não sei"]

export function Contato() {
  const [tipo, setTipo] = useState(tipos[0])
  const [enviado, setEnviado] = useState(false)

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const msg = [
      `Olá! Meu nome é ${f.get("nome")}.`,
      f.get("negocio") ? `Negócio: ${f.get("negocio")}.` : "",
      `Tenho interesse em: ${tipo}.`,
      f.get("mensagem") ? `\n${f.get("mensagem")}` : "",
    ]
      .filter(Boolean)
      .join(" ")
    setEnviado(true)
    window.open(linkWhatsApp(msg), "_blank", "noopener")
    setTimeout(() => setEnviado(false), 4000)
  }

  return (
    <section id="contato" className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[160px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-24 md:grid-cols-2 md:px-8 md:py-32">
        <div>
          <p className="mb-6 flex items-center gap-2 text-sm tracking-[0.2em] text-muted uppercase">
            <Cursor /> Vamos conversar
          </p>
          <h2 className="font-wide text-5xl leading-[0.92] font-extrabold md:text-7xl">
            <MaskReveal>Seu negócio</MaskReveal>
            <MaskReveal delay={0.1}>
              <span className="serif-accent font-normal text-cyan">no ar</span> é o
            </MaskReveal>
            <MaskReveal delay={0.2}>próximo.</MaskReveal>
          </h2>
          <p className="mt-8 max-w-md text-lg text-muted">
            Me conte em poucas linhas o que você faz. Eu respondo com perguntas, ideias e uma proposta por escrito — sem compromisso.
          </p>
          <div className="mt-10 space-y-4">
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 text-lg font-medium hover:text-cyan"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-border group-hover:border-cyan">
                <WhatsIcon />
              </span>
              {contato.whatsappLegivel}
            </a>
            <a href={`mailto:${contato.email}`} className="group flex items-center gap-4 text-lg font-medium break-all hover:text-cyan">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border group-hover:border-cyan">
                <Mail className="h-5 w-5" />
              </span>
              {contato.email}
            </a>
          </div>
        </div>

        <form onSubmit={enviar} className="rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur md:p-8">
          <label className="block">
            <span className="text-sm text-muted">Seu nome</span>
            <input
              name="nome"
              required
              autoComplete="name"
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-cyan focus:shadow-[0_0_0_4px_rgba(0,237,253,0.12)]"
            />
          </label>
          <label className="mt-5 block">
            <span className="text-sm text-muted">Nome do negócio ou ramo</span>
            <input
              name="negocio"
              placeholder="Ex.: clínica, loja de roupas, oficina…"
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition placeholder:text-muted/50 focus:border-cyan focus:shadow-[0_0_0_4px_rgba(0,237,253,0.12)]"
            />
          </label>
          <fieldset className="mt-5">
            <legend className="text-sm text-muted">O que você precisa?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {tipos.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTipo(t)}
                  aria-pressed={tipo === t}
                  className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm transition active:scale-95 ${
                    tipo === t ? "border-cyan bg-cyan text-black" : "border-border text-foreground/80 hover:border-foreground/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="mt-5 block">
            <span className="text-sm text-muted">Conte um pouco (opcional)</span>
            <textarea
              name="mensagem"
              rows={4}
              className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-cyan focus:shadow-[0_0_0_4px_rgba(0,237,253,0.12)]"
            />
          </label>
          <button
            type="submit"
            className="btn-shine mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-cyan px-6 py-4 font-semibold text-black transition hover:bg-white active:scale-[0.98]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={enviado ? "ok" : "enviar"}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-3"
              >
                {enviado ? (
                  <>
                    <Check className="h-5 w-5" /> Abrindo seu WhatsApp…
                  </>
                ) : (
                  <>
                    <WhatsIcon /> Enviar pelo WhatsApp
                  </>
                )}
              </m.span>
            </AnimatePresence>
          </button>
          <p className="mt-3 text-center text-xs text-muted">A mensagem abre pronta no seu WhatsApp. Nada fica salvo aqui.</p>
        </form>
      </div>
    </section>
  )
}
