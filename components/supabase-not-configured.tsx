import Link from "next/link"
import { AlertTriangle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getSupabaseConfigStatus } from "@/lib/supabase/is-configured"

export function SupabaseNotConfigured() {
  const { message } = getSupabaseConfigStatus()

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Supabase Configuration Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>

      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">How to Fix This Issue</h2>

        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li>
            Create a <code className="bg-muted px-1 rounded">.env.local</code> file in the root of your project
          </li>
          <li>
            Add the following environment variables:
            <pre className="bg-muted p-2 rounded mt-2 overflow-x-auto">
              <code>
                NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co{"\n"}
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
              </code>
            </pre>
          </li>
          <li>Restart your development server</li>
        </ol>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
              Go to Supabase Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href="https://supabase.com/docs/guides/getting-started/local-development"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Documentation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
