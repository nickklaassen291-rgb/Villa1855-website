'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  videoId: string
  title: string
  className?: string
}

export default function AutoplayYouTube({ videoId, title, className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

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

  useEffect(() => {
    if (!shouldLoad) return

    function handleMessage(e: MessageEvent) {
      if (
        e.origin !== 'https://www.youtube.com' &&
        e.origin !== 'https://www.youtube-nocookie.com'
      ) {
        return
      }
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        const playing =
          (data?.event === 'onStateChange' && data?.info === 1) ||
          (data?.event === 'infoDelivery' && data?.info?.playerState === 1)
        if (playing) setIsPlaying(true)
      } catch {
        // ignore
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [shouldLoad])

  function handleIframeLoad() {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    win.postMessage(
      JSON.stringify({ event: 'listening', id: 'villa1855-yt' }),
      '*',
    )
    win.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
      '*',
    )
    // Failsafe: if we never get a playing event (e.g. browser blocks autoplay),
    // still reveal the iframe after a short delay so users can press play.
    setTimeout(() => setIsPlaying(true), 1500)
  }

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=1&enablejsapi=1`

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      {shouldLoad && (
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          onLoad={handleIframeLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            opacity: isPlaying ? 1 : 0,
            transition: 'opacity 200ms ease-out',
          }}
        />
      )}
    </div>
  )
}
