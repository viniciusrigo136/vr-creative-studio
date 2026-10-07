import { clsx, type ClassValue } from "clsx"

/**
 * Junta classes CSS. Antes usava também o `tailwind-merge` (≈7 KB a mais de JavaScript)
 * para resolver conflitos como "h-3" + "h-2"; o site foi ajustado para não precisar disso.
 * Se um componente novo do 21st.dev/shadcn depender dessa mesclagem, reinstale:
 *   npm i tailwind-merge   e use   twMerge(clsx(inputs))
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
