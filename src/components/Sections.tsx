import { useState, type FormEvent } from "react"
import { ArrowUpRight, Check, Mail, Plus } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { MagicCard } from "@/components/ui/magic-card"
import { Marquee } from "@/components/ui/marquee"
import { Cursor, SectionHead, WhatsIcon } from "@/components/bits"
import { contato, etapas, linkWhatsApp, pacotes, perguntas, servicos } from "@/content"

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
            alt="Página inicial do site Elbratec EcoCharge"
            className="h-full w-full object-cover object-left-top"
            loading="lazy"
          />
        </div>
      </ContainerScroll>
    </section>
  )
}

/* ───────────── Serviços ───────────── */
export function Servicos() {
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <SectionHead
        index="02"
        label="Serviços"
        title={
          <>
            O que eu <span className="serif-accent font-normal text-cyan">construo</span> para você.
          </>
        }
        aside="Do cartão de visita digital ao sistema com login. Se não estiver na lista, pergunte — muita coisa cabe aqui."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servicos.map((s, i) => (
          <BlurFade key={s.titulo} inView delay={0.05 * i}>
            <MagicCard
              className="h-full rounded-2xl"
              gradientColor="rgba(0,237,253,0.07)"
              gradientFrom="#00edfd"
              gradientTo="#0b6c74"
              gradientSize={260}
            >
              <div className="flex h-full min-h-60 flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-muted">{s.tag}</span>
                </div>
                <h3 className="font-wide mt-auto pt-10 text-2xl font-bold">{s.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.texto}</p>
              </div>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </section>
  )
}

/* ───────────── Processo ───────────── */
export function Processo() {
  return (
    <section id="processo" className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <SectionHead
          index="03"
          label="Como funciona"
          title={
            <>
              IA no motor. <span className="serif-accent font-normal text-cyan">Gente</span> no volante.
            </>
          }
          aside="Você fala comigo do começo ao fim — sem atendente, sem ticket, sem repassar o projeto para terceiros."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {etapas.map((e, i) => (
            <BlurFade key={e.titulo} inView delay={0.08 * i} className="h-full">
              <div className="flex h-full flex-col bg-background p-7 md:min-h-80">
                <span className="font-wide text-5xl font-extrabold text-cyan">{i + 1}</span>
                <h3 className="mt-10 text-lg font-semibold">{e.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{e.texto}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Pacotes ───────────── */
export function Pacotes() {
  return (
    <section id="pacotes" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <SectionHead
        index="04"
        label="Pacotes"
        title={
          <>
            Escolha um ponto de <span className="serif-accent font-normal text-cyan">partida.</span>
          </>
        }
        aside="Cada orçamento é montado para o seu caso. Os pacotes servem de referência para a nossa primeira conversa."
      />
      <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
        {pacotes.map((p, i) => (
          <BlurFade key={p.nome} inView delay={0.08 * i} className="h-full">
            <div
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 ${
                p.destaque ? "border-cyan/30 bg-surface-2" : "border-border bg-surface"
              }`}
            >
              {p.destaque && (
                <>
                  <BorderBeam size={120} duration={8} colorFrom="#00edfd" colorTo="#ffffff" borderWidth={1.5} />
                  <span className="absolute top-6 right-6 rounded-full bg-cyan px-3 py-1 text-[11px] font-bold tracking-wide text-black uppercase">
                    Recomendado
                  </span>
                </>
              )}
              <h3 className="font-wide text-2xl font-bold">{p.nome}</h3>
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
                href={linkWhatsApp(`Olá! Quero um orçamento do pacote "${p.nome}".`)}
                target="_blank"
                rel="noreferrer"
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                  p.destaque ? "bg-cyan text-black hover:bg-white" : "border border-border hover:border-foreground/40"
                }`}
                style={{ marginTop: "2.5rem" }}
              >
                Solicitar orçamento <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  )
}

/* ───────────── Perguntas ───────────── */
export function Perguntas() {
  return (
    <section id="duvidas" className="mx-auto max-w-7xl px-4 pb-24 md:px-8 md:pb-32">
      <SectionHead index="05" label="Dúvidas" title="Perguntas que sempre aparecem." />
      <div className="mt-12 md:ml-[25%]">
        {perguntas.map((q) => (
          <details key={q.p} className="group border-b border-border py-6">
            <summary className="flex cursor-pointer items-start justify-between gap-6 text-lg font-medium md:text-xl">
              {q.p}
              <Plus className="mt-1 h-5 w-5 shrink-0 text-cyan transition group-open:rotate-45" />
            </summary>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{q.r}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/* ───────────── Contato ───────────── */
const tipos = ["Landing page", "Site institucional", "Catálogo de produtos", "Agendamento online", "Sistema sob medida", "Ainda não sei"]

export function Contato() {
  const [tipo, setTipo] = useState(tipos[0])

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
    window.open(linkWhatsApp(msg), "_blank", "noopener")
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
            Seu negócio
            <br />
            <span className="serif-accent font-normal text-cyan">no ar</span> é o
            <br />
            próximo.
          </h2>
          <p className="mt-8 max-w-md text-lg text-muted">
            Me conte em poucas linhas o que você faz. Eu respondo com perguntas, ideias e uma proposta por escrito.
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
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-cyan"
            />
          </label>
          <label className="mt-5 block">
            <span className="text-sm text-muted">Nome do negócio ou ramo</span>
            <input
              name="negocio"
              placeholder="Ex.: clínica, loja de roupas, oficina…"
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none placeholder:text-muted/50 focus:border-cyan"
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
                  className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm transition ${
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
              className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-cyan"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-cyan px-6 py-4 font-semibold text-black transition hover:bg-white"
          >
            <WhatsIcon /> Enviar pelo WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-muted">A mensagem abre pronta no seu WhatsApp. Nada fica salvo aqui.</p>
        </form>
      </div>
    </section>
  )
}
