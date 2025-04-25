# Thinkverse

A platform for discoveries, inventions, and interventions.

## Environment Setup

This project requires several environment variables to be set up before running. Follow these steps to configure your environment:

1. Copy the `.env.example` file to a new file named `.env`:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

2. Fill in the required environment variables in the `.env` file:

   ### Supabase Configuration
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `SUPABASE_JWT_SECRET`: Your Supabase JWT secret

   ### Site Configuration
   - `NEXT_PUBLIC_SITE_URL`: The URL of your site (default: http://localhost:3000)
   - `NEXT_PUBLIC_SITE_NAME`: The name of your site (default: Thinkverse)
   - `NEXT_PUBLIC_SITE_DESCRIPTION`: A short description of your site

   ### Email Configuration (optional, for password reset and notifications)
   - `EMAIL_SERVER_HOST`: SMTP server host
   - `EMAIL_SERVER_PORT`: SMTP server port
   - `EMAIL_SERVER_USER`: SMTP server username
   - `EMAIL_SERVER_PASSWORD`: SMTP server password
   - `EMAIL_FROM`: Email address to send from

   ### Analytics (optional)
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: Google Analytics ID

   ### Storage (for file uploads)
   - `NEXT_PUBLIC_STORAGE_BUCKET`: Storage bucket name

3. Once all required variables are set, you can start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Getting Supabase Credentials

To get your Supabase credentials:

1. Go to [Supabase](https://supabase.com/) and sign in to your account
2. Select your project
3. Go to Project Settings > API
4. Copy the URL and anon key
5. For the service role key, scroll down to the "API Keys" section
6. For the JWT secret, go to Project Settings > API > JWT Settings

## Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account

### Installation

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Building for Production

\`\`\`bash
# Build the application
npm run build

# Start the production server
npm start
\`\`\`

## License

[MIT](LICENSE)
\`\`\`

Let's also create a simple script to check environment variables when the app starts:
