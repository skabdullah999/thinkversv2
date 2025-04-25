import { cn } from "@/lib/utils"

interface AdFallbackProps {
  className?: string
  width?: number
  height?: number
}

export function AdFallback({ className, width, height }: AdFallbackProps) {
  return (
    <div
      className={cn(
        "bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden",
        className,
      )}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
        minHeight: height ? `${height}px` : "90px",
      }}
    >
      <div className="text-center p-4">
        <p className="text-slate-400 text-sm">Advertisement</p>
      </div>
    </div>
  )
}
