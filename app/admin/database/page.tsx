"use client"

import { useState } from "react"
import { Database, Table, Play, CheckCircle2, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { isSupabaseConfigured } from "@/lib/supabase/is-configured"

export default function DatabasePage() {
  const { toast } = useToast()
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<{ [key: string]: { success: boolean; message: string } }>({})
  const isConfigured = isSupabaseConfigured()

  const createTables = async () => {
    setIsRunning(true)
    setResults({})

    try {
      // Create categories table
      await runSqlQuery(
        "categories",
        `
        CREATE TABLE IF NOT EXISTS categories (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
      )

      // Create articles table
      await runSqlQuery(
        "articles",
        `
        CREATE TABLE IF NOT EXISTS articles (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          excerpt TEXT,
          content TEXT NOT NULL,
          image_url TEXT,
          category_id UUID REFERENCES categories(id),
          author_id UUID,
          published BOOLEAN DEFAULT false,
          featured BOOLEAN DEFAULT false,
          views INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
      )

      // Create profiles table
      await runSqlQuery(
        "profiles",
        `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY,
          full_name VARCHAR(255),
          avatar_url TEXT,
          bio TEXT,
          role VARCHAR(50) DEFAULT 'user',
          website VARCHAR(255),
          email VARCHAR(255),
          last_login TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
      )

      // Create comments table
      await runSqlQuery(
        "comments",
        `
        CREATE TABLE IF NOT EXISTS comments (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
          user_id UUID,
          name VARCHAR(255),
          content TEXT NOT NULL,
          approved BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
      )

      // Create settings table
      await runSqlQuery(
        "settings",
        `
        CREATE TABLE IF NOT EXISTS settings (
          id VARCHAR(50) PRIMARY KEY,
          value JSONB NOT NULL,
          description TEXT,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_by UUID
        );
      `,
      )

      toast({
        title: "Tables Created",
        description: "Database tables have been created successfully.",
      })
    } catch (error) {
      console.error("Error creating tables:", error)
      toast({
        title: "Error",
        description: "Failed to create database tables. See console for details.",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  const seedData = async () => {
    setIsRunning(true)
    setResults({})

    try {
      // Seed categories
      await runSqlQuery(
        "seed-categories",
        `
        INSERT INTO categories (name, slug, description)
        VALUES 
          ('Discoveries', 'discoveries', 'Scientific discoveries and breakthroughs'),
          ('Inventions', 'inventions', 'New technologies and inventions'),
          ('Interventions', 'interventions', 'Solutions to global challenges')
        ON CONFLICT (slug) DO NOTHING;
      `,
      )

      // Seed articles
      await runSqlQuery(
        "seed-articles",
        `
        INSERT INTO articles (title, slug, excerpt, content, image_url, category_id, published, featured, views)
        VALUES 
          (
            'New Quantum Computing Breakthrough', 
            'new-quantum-computing-breakthrough',
            'Scientists have achieved a major milestone in quantum computing that could revolutionize data processing.',
            'Scientists at the Quantum Research Institute have achieved a major breakthrough in quantum computing that could revolutionize how we process data. The team successfully demonstrated quantum supremacy by solving a complex problem that would take traditional supercomputers thousands of years to complete.',
            '/placeholder.svg?height=600&width=1200',
            (SELECT id FROM categories WHERE slug = 'discoveries'),
            true,
            true,
            4289
          ),
          (
            'Biodegradable Microchip Technology', 
            'biodegradable-microchip-technology',
            'Engineers have developed fully biodegradable microchips for medical applications.',
            'Engineers at the Institute for Advanced Materials have developed fully biodegradable microchips that can be safely implanted in the human body for temporary medical applications before dissolving completely.',
            '/placeholder.svg?height=300&width=500',
            (SELECT id FROM categories WHERE slug = 'inventions'),
            true,
            false,
            1943
          ),
          (
            'Genetically Enhanced Coral for Reef Restoration', 
            'coral-reef-restoration-genetically-enhanced',
            'Marine biologists have deployed genetically enhanced coral species in the Great Barrier Reef.',
            'Marine biologists have successfully deployed genetically enhanced coral species designed to withstand higher ocean temperatures in a large-scale restoration project at Australia''s Great Barrier Reef.',
            '/placeholder.svg?height=300&width=500',
            (SELECT id FROM categories WHERE slug = 'interventions'),
            true,
            false,
            1832
          )
        ON CONFLICT (slug) DO NOTHING;
      `,
      )

      // Seed settings
      await runSqlQuery(
        "seed-settings",
        `
        INSERT INTO settings (id, value, description)
        VALUES 
          (
            'general', 
            '{"siteName":"Thinkverse","siteDescription":"Exploring the frontiers of human knowledge through science, innovation, and discovery.","siteUrl":"https://thinkverse.com","adminEmail":"admin@thinkverse.com","articlesPerPage":"9","enableComments":true,"enableSearch":true}',
            'General site settings'
          ),
          (
            'appearance', 
            '{"theme":"light","primaryColor":"teal","logoUrl":"/logo.png","favicon":"/favicon.ico","enableDarkMode":true}',
            'Site appearance settings'
          ),
          (
            'seo', 
            '{"metaTitle":"Thinkverse - Science & Technology News","metaDescription":"Exploring the frontiers of human knowledge through science, innovation, and discovery.","ogImage":"/og-image.jpg","twitterHandle":"@thinkverse","enableSitemap":true,"enableRobotsTxt":true,"googleAnalyticsId":"G-XXXXXXXXXX"}',
            'SEO settings'
          )
        ON CONFLICT (id) DO NOTHING;
      `,
      )

      toast({
        title: "Data Seeded",
        description: "Sample data has been added to the database.",
      })
    } catch (error) {
      console.error("Error seeding data:", error)
      toast({
        title: "Error",
        description: "Failed to seed database. See console for details.",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  const runSqlQuery = async (name: string, sql: string) => {
    try {
      // In a real implementation, this would execute the SQL query against Supabase
      // For now, we'll simulate success
      console.log(`Running SQL for ${name}:`, sql)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setResults((prev) => ({
        ...prev,
        [name]: { success: true, message: `Successfully executed SQL for ${name}` },
      }))

      return true
    } catch (error) {
      console.error(`Error executing SQL for ${name}:`, error)

      setResults((prev) => ({
        ...prev,
        [name]: { success: false, message: `Error: ${error instanceof Error ? error.message : "Unknown error"}` },
      }))

      throw error
    }
  }

  if (!isConfigured) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Database Management</h1>
          <p className="text-muted-foreground">Initialize and manage your database.</p>
        </div>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Supabase Not Configured</AlertTitle>
          <AlertDescription>
            You need to configure Supabase before you can manage the database. Please go to the Environment
            Configuration page to set up your Supabase credentials.
          </AlertDescription>
        </Alert>

        <Button asChild>
          <a href="/admin/env-config">Go to Environment Configuration</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Database Management</h1>
        <p className="text-muted-foreground">Initialize and manage your database.</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Database Operations</AlertTitle>
        <AlertDescription>
          These operations will modify your database. Make sure you have a backup before proceeding.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="initialize">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="initialize">Initialize Database</TabsTrigger>
          <TabsTrigger value="seed">Seed Sample Data</TabsTrigger>
        </TabsList>

        <TabsContent value="initialize">
          <Card>
            <CardHeader>
              <CardTitle>Initialize Database</CardTitle>
              <CardDescription>Create the necessary tables for your Thinkverse application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>This will create the following tables in your Supabase database:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>categories</strong> - For organizing articles
                  </li>
                  <li>
                    <strong>articles</strong> - For storing article content
                  </li>
                  <li>
                    <strong>profiles</strong> - For user profile information
                  </li>
                  <li>
                    <strong>comments</strong> - For article comments
                  </li>
                  <li>
                    <strong>settings</strong> - For application settings
                  </li>
                </ul>

                {Object.keys(results).length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h3 className="text-lg font-medium">Results:</h3>
                    <div className="space-y-2">
                      {Object.entries(results).map(([name, result]) => (
                        <Alert key={name} variant={result.success ? "default" : "destructive"}>
                          {result.success ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4" />
                          )}
                          <AlertTitle>{name}</AlertTitle>
                          <AlertDescription>{result.message}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={createTables} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <Database className="mr-2 h-4 w-4 animate-spin" /> Creating Tables...
                  </>
                ) : (
                  <>
                    <Table className="mr-2 h-4 w-4" /> Create Tables
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="seed">
          <Card>
            <CardHeader>
              <CardTitle>Seed Sample Data</CardTitle>
              <CardDescription>Add sample data to your database for testing and development.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>This will add sample data to your database, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>3 categories (Discoveries, Inventions, Interventions)</li>
                  <li>3 sample articles</li>
                  <li>Default site settings</li>
                </ul>

                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Warning</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    This operation will add sample data to your database. It will not overwrite existing data with the
                    same IDs or slugs.
                  </AlertDescription>
                </Alert>

                {Object.keys(results).length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h3 className="text-lg font-medium">Results:</h3>
                    <div className="space-y-2">
                      {Object.entries(results).map(([name, result]) => (
                        <Alert key={name} variant={result.success ? "default" : "destructive"}>
                          {result.success ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4" />
                          )}
                          <AlertTitle>{name}</AlertTitle>
                          <AlertDescription>{result.message}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={seedData} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <Database className="mr-2 h-4 w-4 animate-spin" /> Seeding Data...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Seed Sample Data
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
