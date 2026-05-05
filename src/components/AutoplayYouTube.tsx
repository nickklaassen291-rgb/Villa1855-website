'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  videoId: string
  title: string
  className?: string
}

export default function AutoplayYouTube({ videoId, title, className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin: '200px 0px', threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=1`

  return (
    <div ref={wrapperRef} className={className} style={{ width: '100%', height: '100%', backgroundColor: '#000' }}>
      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 0 }}
        />
      )}
    </div>
  )
}
