// Velaris — fundo WebGL animado do 21st.dev (simplex noise + grão),
// com pequenas correções: cores estáveis entre renders, limpeza dos
// recursos WebGL, pausa fora da tela e respeito a prefers-reduced-motion.
import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShaderGLSL = `
precision highp float;
varying vec2 vUv;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3  u_colors[4];
uniform vec3  u_bg;
uniform float u_scale;
uniform float u_sharp;

// smoothstep com transição mais curta (u_sharp > 1 = bordas mais definidas)
float ss(float a, float b, float x) {
  float c = (a + b) * 0.5;
  float w = (b - a) * 0.5 / u_sharp;
  return smoothstep(c - w, c + w, x);
}

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;
  p *= u_scale;

  float t = u_time * 0.1;

  float n1 = snoise(p * 0.4 + vec2(t * 0.2, -t * 0.3));
  float n2 = snoise(p * 0.55 + vec2(-t * 0.15, t * 0.25) + n1 * 0.25);
  float n3 = snoise(p * 0.75 + vec2(t * 0.1, -t * 0.2) + n2 * 0.2);

  vec3 col = u_bg;

  float dist = length(p) * 1.5;
  float vignette = 1.0 - smoothstep(0.3, 1.2, dist);

  col = mix(col, u_colors[0], ss(-0.2, 0.5, n1) * 0.85);
  col = mix(col, u_colors[1], ss(-0.1, 0.6, n2) * 0.7);
  col = mix(col, u_colors[2], ss(-0.3, 0.4, n3) * 0.6);
  col = mix(col, u_colors[3], ss(0.0, 0.7, n1 * n2) * 0.5);

  float glow = smoothstep(0.8, 0.0, dist) * 0.3;
  col += u_colors[1] * glow;

  col = mix(col * 0.2, col, vignette);

  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * u_grain * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`

export interface VelarisProps {
  bg?: string
  colors?: string[]
  speed?: number
  grain?: number
  height?: string
  /** Tamanho das manchas: maior = mais detalhes (padrão 1) */
  scale?: number
  /** Fundo CSS mostrado enquanto o WebGL ainda não começou (deixe parecido com o resultado final) */
  placeholder?: string
  /** Definição das bordas entre cores: maior = menos desfoque (padrão 1) */
  sharpness?: number
  className?: string
  children?: ReactNode
}

const DEFAULT_COLORS = ["#86efac", "#4ade80", "#059669", "#000000"]

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "")
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]
}

const Velaris = ({
  bg = "#000000",
  colors = DEFAULT_COLORS,
  speed = 2.0,
  grain = 0.3,
  height = "100vh",
  scale = 1,
  sharpness = 1,
  placeholder,
  className,
  children,
}: VelarisProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const colorsKey = colors.join(",")
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let limpar = () => {}
    let cancelado = false

    // Desempenho: compilar o shader é pesado no celular. Só começa depois que a página
    // terminou de carregar e o navegador está ocioso; até lá aparece o `placeholder`.
    const iniciar = () => {
      if (cancelado) return
      const gl = canvas.getContext("webgl")
      if (!gl) return

      const createShader = (type: number, src: string) => {
        const s = gl.createShader(type)!
        gl.shaderSource(s, src)
        gl.compileShader(s)
        return s
      }

      const vs = createShader(gl.VERTEX_SHADER, vertexShaderGLSL)
      const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderGLSL)
      const program = gl.createProgram()!
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      gl.useProgram(program)

      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

      const pos = gl.getAttribLocation(program, "position")
      gl.enableVertexAttribArray(pos)
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

      const locs = {
        res: gl.getUniformLocation(program, "u_resolution"),
        time: gl.getUniformLocation(program, "u_time"),
        grain: gl.getUniformLocation(program, "u_grain"),
        colors: gl.getUniformLocation(program, "u_colors"),
        bg: gl.getUniformLocation(program, "u_bg"),
        scale: gl.getUniformLocation(program, "u_scale"),
        sharp: gl.getUniformLocation(program, "u_sharp"),
      }

      // uniforms fixos: enviados uma vez
      gl.uniform1f(locs.grain, grain)
      gl.uniform1f(locs.scale, scale)
      gl.uniform1f(locs.sharp, sharpness)
      gl.uniform3f(locs.bg, ...hexToRgb(bg))
      gl.uniform3fv(locs.colors, new Float32Array(colorsKey.split(",").slice(0, 4).flatMap(hexToRgb)))

      // Tamanho vem do ResizeObserver (contentRect): não força o navegador a recalcular o layout
      const resize = (largura: number, altura: number) => {
        // no celular, 1 pixel por pixel de tela basta para um degradê: metade do trabalho da placa de vídeo
        const dpr = Math.min(window.devicePixelRatio, largura < 768 ? 1 : 1.5)
        canvas.width = Math.max(1, Math.round(largura * dpr))
        canvas.height = Math.max(1, Math.round(altura * dpr))
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      // Com "reduzir movimento" ligado o fundo continua animando, só que mais devagar
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const ritmo = reduce ? 0.8 : 1

      let visivel = true
      const io = new IntersectionObserver(([e]) => {
        const estava = visivel
        visivel = e.isIntersecting
        if (visivel && !estava) raf = requestAnimationFrame(render)
      })
      io.observe(container)

      let raf = 0
      let primeiro = true
      const inicio = 20000 // começa num ponto já "formado" do gradiente
      const draw = (t: number) => {
        gl.uniform2f(locs.res, canvas.width, canvas.height)
        gl.uniform1f(locs.time, (inicio + t * ritmo) * 0.001 * speed)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      const render = (t: number) => {
        draw(t)
        if (primeiro) {
          primeiro = false
          setPronto(true)
        }
        if (visivel) raf = requestAnimationFrame(render)
      }
      // redimensionar o canvas apaga o desenho: redesenha na hora
      const ro = new ResizeObserver(([e]) => {
        resize(e.contentRect.width, e.contentRect.height)
        draw(performance.now())
        if (!raf) raf = requestAnimationFrame(render)
      })
      ro.observe(container)

      limpar = () => {
        ro.disconnect()
        io.disconnect()
        cancelAnimationFrame(raf)
        gl.deleteBuffer(buffer)
        gl.deleteProgram(program)
        gl.deleteShader(vs)
        gl.deleteShader(fs)
      }
    }

    let idle = 0
    let timer = 0
    const agendar = () => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(iniciar, { timeout: 2500 })
      else timer = setTimeout(iniciar, 600)
    }
    if (document.readyState === "complete") agendar()
    else window.addEventListener("load", agendar, { once: true })

    return () => {
      cancelado = true
      window.removeEventListener("load", agendar)
      if (idle) window.cancelIdleCallback(idle)
      clearTimeout(timer)
      limpar()
    }
  }, [bg, colorsKey, speed, grain, scale, sharpness])

  return (
    <div ref={containerRef} style={{ height, background: placeholder }} className={cn("relative w-full overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-1000",
          pronto ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}

export default Velaris
