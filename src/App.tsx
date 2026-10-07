import { useEffect, useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Hero } from "@/components/Hero"
import { Portfolio } from "@/components/Portfolio"
import { Clientes, Contato, Diferenciais, Faixa, Pacotes, Perguntas, Processo, Servicos, Vitrine } from "@/components/Sections"
import { WhatsIcon } from "@/components/bits"
import { ScrollProgress } from "@/components/fx"
import { contato, linkWhatsApp } from "@/content"

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#clientes", label: "Clientes" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#duvidas", label: "Dúvidas" },
]

function Nav() {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)
  const [escondido, setEscondido] = useState(false)

  // Fundo com desfoque depois de rolar; some ao descer e volta ao subir (mais tela livre no celular)
  useEffect(() => {
    let ultimo = window.scrollY
    const on = () => {
      const y = window.scrollY
      setRolou(y > 20)
      if (y < 400 || y < ultimo - 4) setEscondido(false)
      else if (y > ultimo + 4) setEscondido(true)
      ultimo = y
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [aberto])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[translate,background-color,border-color] duration-300 ${
        rolou || aberto ? "border-border bg-background/80 backdrop-blur-xl" : "border-transparent bg-transparent"
      } ${escondido && !aberto ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <a href="#topo" className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="VR Creative — início">
          <img src="brand/logo-mark.png" alt="" className="h-6 w-auto sm:h-7 md:h-8" />
          <span className="block text-[11px] leading-none font-extrabold tracking-[0.2em] text-cyan sm:text-xs">
            CREATIVE
          </span>
        </a>
        <ul className="hidden items-center gap-8 text-sm text-muted lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative transition after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-cyan after:transition-transform after:duration-300 hover:text-foreground hover:after:origin-left hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noreferrer"
            className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap text-black transition hover:bg-cyan active:scale-95 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Pedir orçamento <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setAberto((v) => !v)}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border transition active:scale-90 lg:hidden"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={aberto ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {aberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "calc(100dvh - 4rem)", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <ul className="flex h-full flex-col px-4 pt-2 pb-[max(2rem,env(safe-area-inset-bottom))]">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: "easeOut" }}
                >
                  <a
                    onClick={() => setAberto(false)}
                    href={l.href}
                    className="font-wide flex items-center justify-between border-b border-border py-5 text-3xl font-bold active:text-cyan"
                  >
                    {l.label}
                    <span className="font-mono text-xs font-normal text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                className="mt-auto pt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.35 }}
              >
                <a
                  href={linkWhatsApp()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shine flex items-center justify-center gap-2 rounded-full bg-cyan py-4 font-semibold text-black active:scale-[0.98]"
                >
                  <WhatsIcon /> Pedir orçamento
                </a>
                <p className="mt-3 text-center text-xs text-muted">Você fala direto comigo, pelo WhatsApp.</p>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Rodape() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <img src="brand/logo-full.png" alt="VR Creative" className="h-auto w-40" />
        <div className="mt-10 flex flex-col justify-between gap-6 border-t border-border pt-8 text-sm text-muted md:flex-row">
          <p>© {new Date().getFullYear()} VR Creative · Vinicius Rigo</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={linkWhatsApp()} target="_blank" rel="noreferrer" className="hover:text-foreground">
              WhatsApp {contato.whatsappLegivel}
            </a>
            <a href={`mailto:${contato.email}`} className="hover:text-foreground">
              {contato.email}
            </a>
            {contato.instagram && (
              <a href={`https://instagram.com/${contato.instagram}`} target="_blank" rel="noreferrer" className="hover:text-foreground">
                @{contato.instagram}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

/** Mostra o atalho do WhatsApp depois do topo e esconde quando o formulário de contato já está na tela */
function useMostrarCTA() {
  const [mostrar, setMostrar] = useState(false)
  useEffect(() => {
    const on = () => {
      const contatoEl = document.getElementById("contato")
      const chegouNoContato = contatoEl ? window.scrollY + window.innerHeight > contatoEl.offsetTop + 120 : false
      setMostrar(window.scrollY > 700 && !chegouNoContato)
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
    }
  }, [])
  return mostrar
}

/* Computador: botão redondo com anel pulsando e um balão de convite */
function BotaoFlutuante({ mostrar }: { mostrar: boolean }) {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar no WhatsApp"
      className={`group fixed right-8 bottom-8 z-40 hidden items-center gap-3 transition-all duration-300 md:flex ${
        mostrar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="translate-x-2 rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-medium opacity-0 shadow-lg backdrop-blur transition group-hover:translate-x-0 group-hover:opacity-100">
        Vamos conversar?
      </span>
      <span className="pulse-ring grid h-14 w-14 place-items-center rounded-full bg-cyan text-black shadow-[0_10px_40px_-5px_rgba(0,237,253,0.5)] transition group-hover:scale-105">
        <WhatsIcon className="h-6 w-6" />
      </span>
    </a>
  )
}

/* Celular: barra fixa embaixo, sempre ao alcance do polegar */
function BarraCelular({ mostrar }: { mostrar: boolean }) {
  return (
    <AnimatePresence>
      {mostrar && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/90 p-2 pl-4 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Gostou do que viu?</p>
              <p className="truncate text-xs text-muted">Orçamento sem compromisso</p>
            </div>
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noreferrer"
              className="btn-shine pulse-ring inline-flex shrink-0 items-center gap-2 rounded-xl bg-cyan px-4 py-3 text-sm font-semibold text-black active:scale-95"
            >
              <WhatsIcon className="h-4 w-4" /> Chamar no Whats
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const mostrarCTA = useMostrarCTA()
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative">
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <Faixa />
          <Portfolio />
          <Vitrine />
          <Diferenciais />
          <Servicos />
          <Processo />
          <Clientes />
          <Pacotes />
          <Perguntas />
          <Contato />
        </main>
        <Rodape />
        <BotaoFlutuante mostrar={mostrarCTA} />
        <BarraCelular mostrar={mostrarCTA} />
      </div>
    </MotionConfig>
  )
}
