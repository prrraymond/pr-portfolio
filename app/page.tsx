import Hero from "@/components/hero"
import ContentSection from "@/components/content-section"
import Footer from "@/components/footer"
import AiAssistant from "@/components/ai-assistant"
import FounderFixBanner from "@/components/founder-fix-banner"
import { getAllContent } from "@/lib/airtable"

export default async function Home() {
  // Fetch content from Airtable
  const { categories, hero, items } = await getAllContent()

  return (
    <main className="min-h-screen bg-white">
      <Hero heroContent={hero} allProjects={items} />
      <div className="container mx-auto px-4 mt-4">
        <FounderFixBanner />
      </div>
      <ContentSection initialCategories={categories} />
      <Footer />
      <AiAssistant />
    </main>
  )
}
