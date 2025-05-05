import { getAllContent } from "@/lib/airtable"
import Hero from "@/components/hero"
import ContentSection from "@/components/content-section"
import Footer from "@/components/footer"
import AiAssistant from "@/components/ai-assistant"

export default async function Home() {
  // Fetch content from Airtable
  const { categories, hero, items } = await getAllContent()

  return (
    <main className="min-h-screen bg-white">
      <Hero heroContent={hero} allProjects={items} />
      <ContentSection initialCategories={categories} />
      <Footer />
      <AiAssistant />
    </main>
  )
}
