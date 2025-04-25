"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Beaker, LogIn } from "lucide-react"
import { usePathname } from "next/navigation"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SearchAutocomplete } from "@/components/search-autocomplete"
import { Button } from "@/components/ui/button"
import { UserDropdown } from "@/components/auth/user-dropdown"
import { useAuth } from "@/lib/auth-context"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "w-full transition-all duration-200 border-b",
          isScrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-white",
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 py-4">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-teal-400 to-teal-600 text-white">
                        <Beaker className="h-5 w-5" />
                      </div>
                      <span className="text-xl font-bold tracking-tight">Thinkverse</span>
                    </Link>
                  </div>

                  <div className="py-4">
                    <SearchAutocomplete mobile={true} />
                  </div>

                  <nav className="flex flex-col space-y-1 mt-4">
                    <Link
                      href="/"
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium",
                        isActive("/") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
                      )}
                    >
                      Home
                    </Link>
                    <Link
                      href="/latest"
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium",
                        isActive("/latest") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
                      )}
                    >
                      Latest
                    </Link>
                    <Link
                      href="/topics"
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium",
                        isActive("/topics") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
                      )}
                    >
                      Topics
                    </Link>
                  </nav>

                  <div className="mt-6">
                    <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categories</h3>
                    <nav className="mt-2 flex flex-col space-y-1">
                      <Link
                        href="/discoveries"
                        className={cn(
                          "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                          isActive("/discoveries") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
                        )}
                      >
                        <span className="w-1.5 h-4 bg-teal-500 rounded-full mr-2.5"></span>
                        Discoveries
                      </Link>
                      <Link
                        href="/inventions"
                        className={cn(
                          "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                          isActive("/inventions") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
                        )}
                      >
                        <span className="w-1.5 h-4 bg-amber-500 rounded-full mr-2.5"></span>
                        Inventions
                      </Link>
                      <Link
                        href="/interventions"
                        className={cn(
                          "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                          isActive("/interventions") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
                        )}
                      >
                        <span className="w-1.5 h-4 bg-purple-500 rounded-full mr-2.5"></span>
                        Interventions
                      </Link>
                    </nav>
                  </div>

                  <div className="mt-6">
                    <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Popular Topics
                    </h3>
                    <div className="mt-2 px-3">
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Quantum Physics",
                          "Biotechnology",
                          "Climate",
                          "AI",
                          "Space",
                          "Medicine",
                          "Robotics",
                          "Neuroscience",
                        ].map((topic) => (
                          <Link
                            key={topic}
                            href={`/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium hover:bg-teal-50 hover:text-teal-700 transition-colors"
                          >
                            {topic}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t">
                    <nav className="flex flex-col space-y-1">
                      <Link
                        href="/about"
                        className={cn(
                          "px-3 py-2 rounded-md text-sm font-medium",
                          isActive("/about") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
                        )}
                      >
                        About
                      </Link>
                      <Link
                        href="/contact"
                        className={cn(
                          "px-3 py-2 rounded-md text-sm font-medium",
                          isActive("/contact") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
                        )}
                      >
                        Contact
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-teal-400 to-teal-600 text-white">
                <Beaker className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">Thinkverse</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
              )}
            >
              Home
            </Link>
            <Link
              href="/discoveries"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/discoveries") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
              )}
            >
              Discoveries
            </Link>
            <Link
              href="/inventions"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/inventions") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
              )}
            >
              Inventions
            </Link>
            <Link
              href="/interventions"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/interventions") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
              )}
            >
              Interventions
            </Link>
            <Link
              href="/topics"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/topics") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
              )}
            >
              Topics
            </Link>
            <Link
              href="/about"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/about") ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-100",
              )}
            >
              About
            </Link>
          </nav>

          {/* Search and Auth */}
          <div className="flex items-center gap-4">
            <SearchAutocomplete className="w-60" />

            {/* Auth buttons */}
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse"></div>
            ) : user ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Sign up</Link>
                </Button>
                <Button asChild variant="ghost" size="icon" className="md:hidden">
                  <Link href="/login">
                    <LogIn className="h-5 w-5" />
                    <span className="sr-only">Log in</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
