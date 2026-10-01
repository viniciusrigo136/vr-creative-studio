import { useEffect, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Hero } from "@/components/Hero"
import { Portfolio } from "@/components/Portfolio"
import { Contato, Faixa, Pacotes, Perguntas, Processo, Servicos, Vitrine } from "@/components/Sections"
import { WhatsIcon } from "@/components/bits"
import { contato, linkWhatsApp } from "@/content"

const links = [
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Como funciona" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#duvidas", label: "Dúvidas" },
]

function Nav() {
  const [aberto, setAberto] = useState(false)

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background"
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
              <a href={l.href} className="transition hover:text-foreground">
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
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap text-black transition hover:bg-cyan sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Pedir orçamento <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setAberto((v) => !v)}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border lg:hidden"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
          >
            {aberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {aberto && (
        <ul className="border-t border-border px-4 pb-6 lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a onClick={() => setAberto(false)} href={l.href} className="font-wide block border-b border-border py-4 text-2xl font-bold">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-cyan py-4 font-semibold text-black"
            >
              <WhatsIcon /> Pedir orçamento
            </a>
          </li>
        </ul>
      )}
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

function BotaoFlutuante() {
  const [mostrar, setMostrar] = useState(false)
  useEffect(() => {
    const on = () => {
      // some no topo e quando o formulário de contato já está na tela
      const contato = document.getElementById("contato")
      const noContato = contato ? contato.getBoundingClientRect().top < window.innerHeight * 0.85 : false
      setMostrar(window.scrollY > 600 && !noContato)
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar no WhatsApp"
      className={`fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 grid h-13 w-13 place-items-center md:h-14 md:w-14 rounded-full bg-cyan text-black shadow-[0_10px_40px_-5px_rgba(0,237,253,0.5)] transition-all duration-300 hover:scale-105 md:right-8 md:bottom-8 ${
        mostrar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <WhatsIcon className="h-6 w-6" />
    </a>
  )
}

export default function App() {
  return (
    <div className="grain relative">
      <Nav />
      <main>
        <Hero />
        <Faixa />
        <Portfolio />
        <Vitrine />
        <Servicos />
        <Processo />
        <Pacotes />
        <Perguntas />
        <Contato />
      </main>
      <Rodape />
      <BotaoFlutuante />
    </div>
  )
}
