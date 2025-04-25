import { SiteHeader } from "@/components/site-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Thinkverse</h1>
          <div className="bg-white rounded-xl shadow-sm p-6 prose prose-slate max-w-none">
            <p>
              Thinkverse is dedicated to exploring the frontiers of human knowledge through in-depth coverage of
              scientific discoveries, technological innovations, and world-changing interventions.
            </p>
            <p>
              Founded in 2023, our platform serves as a bridge between cutting-edge research and the public, translating
              complex scientific concepts into accessible, engaging content for curious minds.
            </p>
            <h2>Our Mission</h2>
            <p>
              At Thinkverse, we believe that scientific literacy is essential for navigating our increasingly complex
              world. Our mission is to:
            </p>
            <ul>
              <li>Highlight groundbreaking discoveries across scientific disciplines</li>
              <li>Showcase transformative inventions and emerging technologies</li>
              <li>Explore innovative interventions addressing global challenges</li>
              <li>Foster critical thinking and evidence-based reasoning</li>
            </ul>
            <h2>Our Team</h2>
            <p>
              Our diverse team includes science journalists, researchers, engineers, and educators united by a passion
              for knowledge and discovery. Each contributor brings specialized expertise and a commitment to accuracy,
              clarity, and context in science communication.
            </p>
            <p>
              Through thoughtful curation and original reporting, we aim to create a space where readers can explore the
              wonders of science and technology—and imagine the possibilities they unlock for our collective future.
            </p>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Thinkverse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
