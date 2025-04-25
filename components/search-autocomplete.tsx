"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample search data - in a real app, this would come from an API
const SEARCH_SUGGESTIONS = [
  "Quantum Computing",
  "Artificial Intelligence",
  "Climate Change",
  "Renewable Energy",
  "Biotechnology",
  "Space Exploration",
  "Neuroscience",
  "Robotics",
  "Nanotechnology",
  "Genetic Engineering",
  "Machine Learning",
  "Sustainable Development",
  "Quantum Physics",
  "Artificial Neural Networks",
  "Renewable Resources",
]

interface SearchAutocompleteProps {
  className?: string
  mobile?: boolean
}

export function SearchAutocomplete({ className, mobile = false }: SearchAutocompleteProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches")
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  // Filter suggestions based on input
  useEffect(() => {
    if (query.length > 1) {
      const filtered = SEARCH_SUGGESTIONS.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
      setSuggestions(filtered)
      setIsOpen(true)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex < suggestions.length + recentSearches.length - 1 ? prevIndex + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : suggestions.length + recentSearches.length - 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0) {
        const allItems = [...suggestions, ...recentSearches]
        if (selectedIndex < allItems.length) {
          handleSearch(allItems[selectedIndex])
        }
      } else if (query) {
        handleSearch(query)
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  // Handle search submission
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // Save to recent searches
    const updatedRecentSearches = [searchQuery, ...recentSearches.filter((item) => item !== searchQuery)].slice(0, 5)

    setRecentSearches(updatedRecentSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches))

    // Clear input and close dropdown
    setQuery("")
    setIsOpen(false)

    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  // Clear a recent search
  const clearRecentSearch = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedRecentSearches = [...recentSearches]
    updatedRecentSearches.splice(index, 1)
    setRecentSearches(updatedRecentSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches))
  }

  return (
    <div className={cn("relative", className)}>
      <form
        className="relative w-full"
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch(query)
        }}
      >
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search articles..."
          className={cn(
            "pl-10 bg-slate-50 border-slate-200 w-full",
            mobile ? "h-10" : "h-9",
            isOpen && "rounded-b-none border-b-0",
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-slate-400" />
        </div>
        {query && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setQuery("")}
          >
            <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
          </button>
        )}
      </form>

      {/* Suggestions dropdown */}
      {isOpen && (
        <div
          ref={suggestionRef}
          className="absolute z-50 w-full bg-white border border-slate-200 border-t-0 rounded-b-md shadow-lg max-h-80 overflow-auto"
        >
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-slate-500 px-2 py-1">Suggestions</div>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={suggestion}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left font-normal px-2 h-9",
                        selectedIndex === index ? "bg-slate-100" : "",
                      )}
                      onClick={() => handleSearch(suggestion)}
                    >
                      <Search className="w-3.5 h-3.5 mr-2 text-slate-500" />
                      {suggestion}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recentSearches.length > 0 && (
            <div className="p-2 border-t border-slate-100">
              <div className="text-xs font-medium text-slate-500 px-2 py-1">Recent Searches</div>
              <ul>
                {recentSearches.map((search, index) => (
                  <li key={`recent-${index}`}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left font-normal px-2 h-9 group",
                        selectedIndex === suggestions.length + index ? "bg-slate-100" : "",
                      )}
                      onClick={() => handleSearch(search)}
                    >
                      <Clock className="w-3.5 h-3.5 mr-2 text-slate-500" />
                      {search}
                      <X
                        className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600"
                        onClick={(e) => clearRecentSearch(index, e)}
                      />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {suggestions.length === 0 && recentSearches.length === 0 && (
            <div className="p-4 text-center text-sm text-slate-500">No results found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  )
}
