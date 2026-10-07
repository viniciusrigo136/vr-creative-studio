// Container Scroll Animation — componente popular do 21st.dev (Aceternity UI),
// adaptado para Vite + motion/react e para a paleta da VR.
import React, { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, m, type MotionValue } from "motion/react"

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const scaleDimensions = () => (isMobile ? [0.75, 0.95] : [1.05, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      className="relative flex h-[52rem] items-center justify-center p-2 md:h-[72rem] md:p-20"
      ref={containerRef}
    >
      <div className="relative w-full py-10 md:py-32" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: React.ReactNode
}) {
  return (
    <m.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
      {titleComponent}
    </m.div>
  )
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <m.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto -mt-12 h-[26rem] w-full max-w-5xl rounded-[30px] border-4 border-[#2a2f35] bg-[#15181c] p-2 shadow-2xl md:h-[40rem] md:p-5"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-black md:rounded-2xl">
        {children}
      </div>
    </m.div>
  )
}
