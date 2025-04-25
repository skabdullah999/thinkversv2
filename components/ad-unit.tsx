"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AdUnitProps {
  className?: string
  slot: string
  format?: "horizontal" | "vertical" | "rectangle" | "leaderboard" | "large-mobile"
  responsive?: boolean
  style?: React.CSSProperties
}

export function AdUnit({ className, slot, format = "horizontal", responsive = true, style }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)

  // Get dimensions based on format
  const getDimensions = () => {
    switch (format) {
      case "horizontal":
        return { width: 728, height: 90 }
      case "vertical":
        return { width: 300, height: 600 }
      case "rectangle":
        return { width: 300, height: 250 }
      case "leaderboard":
        return { width: 970, height: 90 }
      case "large-mobile":
        return { width: 320, height: 100 }
      default:
        return { width: 728, height: 90 }
    }
  }

  const { width, height } = getDimensions()

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !adRef.current) return

    try {
      // Clean up any existing ad
      if (adRef.current.firstChild) {
        adRef.current.innerHTML = ""
      }

      // Create a new ad
      const adElement = document.createElement("ins")
      adElement.className = "adsbygoogle"
      adElement.style.display = "block"

      if (responsive) {
        adElement.setAttribute("data-ad-format", "auto")
        adElement.setAttribute("data-full-width-responsive", "true")
      } else {
        adElement.style.width = `${width}px`
        adElement.style.height = `${height}px`
      }

      adElement.setAttribute("data-ad-client", "ca-pub-5439908210255109")
      adElement.setAttribute("data-ad-slot", slot)

      adRef.current.appendChild(adElement)

      // Initialize ad
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error("AdSense error:", error)
      }
    } catch (error) {
      console.error("Error setting up AdSense:", error)
    }

    // Cleanup function
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = ""
      }
    }
  }, [slot, responsive, width, height])

  return (
    <div
      ref={adRef}
      className={cn("overflow-hidden text-center", responsive ? "w-full" : "", className)}
      style={{
        minHeight: `${height}px`,
        ...style,
      }}
    >
      {/* AdSense will be inserted here by the useEffect */}
    </div>
  )
}

// Add TypeScript declaration for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}
