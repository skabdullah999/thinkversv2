type EnvVariable = {
  name: string
  required: boolean
}

// Define all environment variables used in the application
const envVariables: EnvVariable[] = [
  // Supabase
  { name: "NEXT_PUBLIC_SUPABASE_URL", required: true },
  { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", required: true },
  { name: "SUPABASE_SERVICE_ROLE_KEY", required: true },
  { name: "SUPABASE_JWT_SECRET", required: true },

  // Site
  { name: "NEXT_PUBLIC_SITE_URL", required: true },
  { name: "NEXT_PUBLIC_SITE_NAME", required: true },
  { name: "NEXT_PUBLIC_SITE_DESCRIPTION", required: true },

  // Email
  { name: "EMAIL_SERVER_HOST", required: false },
  { name: "EMAIL_SERVER_PORT", required: false },
  { name: "EMAIL_SERVER_USER", required: false },
  { name: "EMAIL_SERVER_PASSWORD", required: false },
  { name: "EMAIL_FROM", required: false },

  // Analytics
  { name: "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID", required: false },

  // Storage
  { name: "NEXT_PUBLIC_STORAGE_BUCKET", required: false },
]

/**
 * Validates that all required environment variables are set
 * @returns {boolean} True if all required variables are set, false otherwise
 */
export function validateEnv(): boolean {
  const missingVariables: string[] = []

  for (const variable of envVariables) {
    if (variable.required && !process.env[variable.name]) {
      missingVariables.push(variable.name)
    }
  }

  if (missingVariables.length > 0) {
    console.error(`Missing required environment variables: ${missingVariables.join(", ")}`)
    return false
  }

  return true
}

/**
 * Gets an environment variable with type safety
 * @param {string} name - The name of the environment variable
 * @param {string} defaultValue - Default value if the variable is not set
 * @returns {string} The value of the environment variable or the default value
 */
export function getEnv(name: string, defaultValue = ""): string {
  return process.env[name] || defaultValue
}

/**
 * Gets all environment variables as an object
 * @returns {Record<string, string>} Object containing all environment variables
 */
export function getAllEnv(): Record<string, string> {
  const env: Record<string, string> = {}

  for (const variable of envVariables) {
    if (process.env[variable.name]) {
      env[variable.name] = process.env[variable.name] as string
    }
  }

  return env
}
