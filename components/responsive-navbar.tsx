"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Beaker, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchAutocomplete } from "@/components/search-autocomplete"
import { cn } from "@/lib/utils"

export function ResponsiveNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Close search when menu opens
    if (!isMenuOpen) setIsSearchOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    // Close menu when search opens
    if (!isSearchOpen) setIsMenuOpen(false)
  }

  return (
    <>
      <div className="h-16 w-full"></div> {/* Spacer to prevent content from being hidden under fixed navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b",
          isScrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-white",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-teal-400 to-teal-600 text-white">
                  <Beaker className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">Thinkverse</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-700 hover:text-teal-600 font-medium">
                Home
              </Link>
              <Link href="/discoveries" className="text-slate-700 hover:text-teal-600 font-medium">
                Discoveries
              </Link>
              <Link href="/inventions" className="text-slate-700 hover:text-teal-600 font-medium">
                Inventions
              </Link>
              <Link href="/interventions" className="text-slate-700 hover:text-teal-600 font-medium">
                Interventions
              </Link>
              <Link href="/topics" className="text-slate-700 hover:text-teal-600 font-medium">
                Topics
              </Link>
              <Link href="/about" className="text-slate-700 hover:text-teal-600 font-medium">
                About
              </Link>
            </nav>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center">
              <SearchAutocomplete className="w-60" />
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleSearch} className="mr-1">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden py-3 border-t">
              <SearchAutocomplete mobile={true} />
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/discoveries"
                  className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Discoveries
                </Link>
                <Link
                  href="/inventions"
                  className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inventions
                </Link>
                <Link
                  href="/interventions"
                  className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Interventions
                </Link>
                <Link
                  href="/topics"
                  className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Topics
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
