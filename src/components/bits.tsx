import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { MaskReveal } from "@/components/fx"

/** Triângulo-cursor da logo, usado como marcador visual */
export function Cursor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("inline-block text-cyan", className ?? "h-3 w-3")}>
      <path d="M3 2 L22 13.2 L12.6 13.6 L3 22 Z" fill="currentColor" />
    </svg>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-muted uppercase", className)}>
      <Cursor className="h-2.5 w-2.5" />
      {children}
    </p>
  )
}

export function SectionHead({
  index,
  label,
  title,
  aside,
}: {
  index: string
  label: string
  title: ReactNode
  aside?: ReactNode
}) {
  return (
    <div className="grid gap-8 border-t border-border pt-6 md:grid-cols-12">
      <div className="flex items-baseline gap-4 md:col-span-3">
        <span className="font-mono text-xs text-cyan">{index}</span>
        <span className="text-xs font-semibold tracking-[0.22em] text-muted uppercase">{label}</span>
      </div>
      <h2 className="font-wide text-4xl leading-[0.95] font-extrabold text-balance md:col-span-6 md:text-6xl">
        <MaskReveal>{title}</MaskReveal>
      </h2>
      {aside && <div className="text-sm leading-relaxed text-muted md:col-span-3 md:pt-2">{aside}</div>}
    </div>
  )
}

export function WhatsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className ?? "h-5 w-5"} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.01-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.25 0 11.34-5.08 11.35-11.34 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  )
}
