// Efeitos e animações reutilizáveis, pensados primeiro para o celular.
import { Children, useEffect, useRef, useState, type ReactNode } from "react"
import { m, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"
import { SIZES_MOLDURA, srcsetDe } from "@/lib/imagens"

/* Barra fina no topo mostrando quanto da página já foi lida */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-cyan-deep via-cyan to-white"
    />
  )
}

/* Parallax leve: o conteúdo anda um pouco mais devagar que a rolagem */
export function Parallax({ children, distancia = 30, className }: { children: ReactNode; distancia?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [distancia, -distancia])
  return (
    <div ref={ref} className={className}>
      <m.div style={reduzir ? undefined : { y }}>{children}</m.div>
    </div>
  )
}

/* Texto que sobe de dentro de uma "máscara" ao entrar na tela */
export function MaskReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visto = useInView(ref, { once: true, margin: "-60px" })
  return (
    <span ref={ref} className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <m.span
        className="block"
        initial={{ y: "105%", rotate: 2 }}
        animate={visto ? { y: "0%", rotate: 0 } : undefined}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.span>
    </span>
  )
}

/* Linha horizontal com "snap" no celular e grade a partir do tablet */
export function SnapRow({
  children,
  className,
  itemClassName,
  inicial = 0,
  rotulo,
}: {
  children: ReactNode
  className?: string
  itemClassName?: string
  inicial?: number
  rotulo: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const itens = Children.toArray(children)
  const [ativo, setAtivo] = useState(inicial)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Só no celular (onde vira carrossel): centraliza o item inicial, lendo o layout uma única vez
    const celular = window.matchMedia("(max-width: 639px)").matches
    const raf = celular
      ? requestAnimationFrame(() => {
          const filho = el.children[inicial] as HTMLElement | undefined
          if (filho) el.scrollLeft = filho.offsetLeft - (el.clientWidth - filho.clientWidth) / 2
        })
      : 0
    // Qual cartão está no centro: IntersectionObserver em vez de medir a cada rolagem (evita reflow)
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setAtivo(Array.prototype.indexOf.call(el.children, e.target))
        }
      },
      { root: el, threshold: 0.6 },
    )
    Array.from(el.children).forEach((c) => obs.observe(c))
    return () => {
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [inicial])

  function irPara(i: number) {
    const el = ref.current
    const filho = el?.children[i] as HTMLElement | undefined
    if (!el || !filho) return
    el.scrollTo({ left: filho.offsetLeft - (el.clientWidth - filho.clientWidth) / 2, behavior: "smooth" })
  }

  return (
    <div>
      <div
        ref={ref}
        role="region"
        aria-label={rotulo}
        className={cn(
          "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0",
          className,
        )}
      >
        {itens.map((c, i) => (
          <div key={i} className={cn("w-[84%] shrink-0 snap-center sm:w-auto", itemClassName)}>
            {c}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
        {itens.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ir para o item ${i + 1}`}
            className={cn("h-1.5 cursor-pointer rounded-full transition-all duration-300", i === ativo ? "w-6 bg-cyan" : "w-1.5 bg-white/20")}
          />
        ))}
      </div>
    </div>
  )
}

/* Faz uma página inteira "rolar sozinha" dentro da moldura enquanto está na tela */
export function AutoScrollShot({
  imagens,
  alt,
  proporcao = 10 / 16,
}: {
  imagens: { src: string; w: number; h: number }[]
  alt: string
  proporcao?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const naTela = useInView(ref, { margin: "-15% 0px" })
  const reduzir = useReducedMotion()
  const alturaTotal = imagens.reduce((s, i) => s + i.h / i.w, 0)
  const desloc = Math.max(0, (1 - proporcao / alturaTotal) * 100)
  const duracao = Math.min(22, 5 + alturaTotal * 2.2)
  const rolar = naTela && !reduzir && desloc > 0

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <m.div
        className="will-change-transform"
        animate={rolar ? { y: ["0%", `-${desloc}%`] } : { y: "0%" }}
        transition={
          rolar
            ? { duration: duracao, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatType: "reverse", repeatDelay: 1.2, delay: 0.8 }
            : { duration: 0.6 }
        }
      >
        {imagens.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            srcSet={srcsetDe(img.src, img.w)}
            sizes={SIZES_MOLDURA}
            width={img.w}
            height={img.h}
            alt={i === 0 ? alt : ""}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        ))}
      </m.div>
    </div>
  )
}

/* Troca as telas de um sistema em sequência, como um slideshow */
export function ShotSlides({
  imagens,
  alt,
  intervalo = 2800,
}: {
  imagens: { src: string; w: number; h: number }[]
  alt: string
  intervalo?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const naTela = useInView(ref, { margin: "-15% 0px" })
  const reduzir = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!naTela || reduzir || imagens.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % imagens.length), intervalo)
    return () => clearInterval(t)
  }, [naTela, reduzir, imagens.length, intervalo])

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-surface">
      {imagens.map((img, k) => (
        <m.img
          key={img.src}
          src={img.src}
          srcSet={srcsetDe(img.src, img.w)}
          sizes={SIZES_MOLDURA}
          width={img.w}
          height={img.h}
          alt={k === 0 ? alt : ""}
          loading="lazy"
          decoding="async"
          initial={false}
          animate={{ opacity: k === i ? 1 : 0, scale: k === i ? 1 : 1.04 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover object-left-top"
        />
      ))}
      <div className="absolute right-3 bottom-3 flex gap-1">
        {imagens.map((img, k) => (
          <span key={img.src} className={cn("h-1 rounded-full transition-all duration-500", k === i ? "w-4 bg-cyan" : "w-1 bg-white/40")} />
        ))}
      </div>
    </div>
  )
}
