'use client'

import { useCallback, useRef } from 'react'

type SoundType = 'coin' | 'jump' | 'stationArrive' | 'cardOpen' | 'cardClose' | 'levelUp'

export function useSoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null)
  const mutedRef = useRef(true) // muted by default

  const getContext = useCallback((): AudioContext | null => {
    if (mutedRef.current) return null
    if (!ctxRef.current) {
      try {
        ctxRef.current = new AudioContext()
      } catch {
        return null
      }
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playTone = useCallback((
    ctx: AudioContext,
    frequency: number,
    duration: number,
    type: OscillatorType = 'square',
    startTime = 0,
    endFrequency?: number,
  ) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime)
    if (endFrequency) {
      osc.frequency.linearRampToValueAtTime(endFrequency, ctx.currentTime + startTime + duration)
    }
    gain.gain.setValueAtTime(0.15, ctx.currentTime + startTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime + startTime)
    osc.stop(ctx.currentTime + startTime + duration)
  }, [])

  const playSound = useCallback((sound: SoundType) => {
    const ctx = getContext()
    if (!ctx) return

    switch (sound) {
      case 'coin':
        playTone(ctx, 988, 0.06, 'square')
        playTone(ctx, 1319, 0.08, 'square', 0.06)
        break
      case 'jump':
        playTone(ctx, 200, 0.15, 'sine', 0, 600)
        break
      case 'stationArrive':
        playTone(ctx, 523, 0.12, 'square')
        playTone(ctx, 659, 0.12, 'square', 0.12)
        playTone(ctx, 784, 0.2, 'square', 0.24)
        break
      case 'cardOpen':
        playTone(ctx, 600, 0.08, 'sine')
        break
      case 'cardClose':
        playTone(ctx, 400, 0.08, 'sine')
        break
      case 'levelUp':
        playTone(ctx, 523, 0.1, 'square')
        playTone(ctx, 659, 0.1, 'square', 0.1)
        playTone(ctx, 784, 0.1, 'square', 0.2)
        playTone(ctx, 1047, 0.3, 'square', 0.3)
        break
    }
  }, [getContext, playTone])

  const setMuted = useCallback((muted: boolean) => {
    mutedRef.current = muted
    // Initialize AudioContext on first unmute (user gesture)
    if (!muted && !ctxRef.current) {
      try {
        ctxRef.current = new AudioContext()
      } catch {
        // Web Audio not supported
      }
    }
  }, [])

  const isMuted = useCallback(() => mutedRef.current, [])

  return { playSound, setMuted, isMuted }
}
