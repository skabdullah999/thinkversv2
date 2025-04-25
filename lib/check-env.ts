import { validateEnv } from "./env"

export function checkEnvironment() {
  // Only run in server context
  if (typeof window === "undefined") {
    // Check if all required environment variables are set
    const isValid = validateEnv()

    if (!isValid) {
      console.error("⚠️ Missing required environment variables. Please check your .env file.")

      // In development, we'll show a more detailed error
      if (process.env.NODE_ENV === "development") {
        console.error("See README.md for instructions on setting up environment variables.")
      }
    } else {
      console.log("✅ Environment variables validated successfully.")
    }
  }
}
