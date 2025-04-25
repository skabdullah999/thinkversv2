import type { Article } from "@/types/article"

// Sample article data
export const featuredArticle: Article = {
  id: 1,
  slug: "new-quantum-computing-breakthrough",
  title: "New Quantum Computing Breakthrough Could Revolutionize Data Processing",
  excerpt:
    "Scientists have achieved a major milestone in quantum computing that could lead to unprecedented computational power and transform numerous industries.",
  fullContent:
    'Scientists at the Quantum Research Institute have achieved a major breakthrough in quantum computing that could revolutionize how we process data. The team successfully demonstrated quantum supremacy by solving a complex problem that would take traditional supercomputers thousands of years to complete.\n\nLed by Dr. Elena Rodriguez, the research team developed a new approach to quantum bit (qubit) stability, allowing for longer coherence times and significantly reducing error rates. This advancement tackles one of the biggest challenges in quantum computing - maintaining quantum states long enough to perform meaningful calculations.\n\n"What makes this discovery particularly exciting is that it provides a path to scaling quantum systems beyond what was previously thought possible," explained Dr. Rodriguez. "We\'re now looking at potential applications in drug discovery, climate modeling, and artificial intelligence that were simply out of reach before."\n\nThe implications of this breakthrough extend across numerous industries. Financial institutions could use quantum algorithms to optimize trading strategies and risk assessment. Pharmaceutical companies might leverage quantum simulations to accelerate drug development. Even transportation and logistics could benefit from quantum-optimized routing and scheduling systems that minimize fuel consumption and delivery times.',
  image: "/placeholder.svg?height=600&width=1200",
  category: "discoveries",
  date: "May 15, 2023",
  views: 4289,
}

export const discoveriesArticles: Article[] = [
  {
    id: 2,
    slug: "ancient-human-species-dna",
    title: "Ancient Human Species DNA Found in Siberian Cave",
    excerpt:
      "Archaeologists have discovered DNA from a previously unknown human species in a remote Siberian cave, potentially rewriting our understanding of human evolution.",
    fullContent:
      'In a groundbreaking discovery, archaeologists working in a remote Siberian cave have uncovered DNA traces from a previously unknown human species. The findings could potentially rewrite our understanding of human evolution and migration patterns.\n\nThe team, led by paleogeneticist Dr. Mikael Petrov, extracted DNA from sediment layers dating back approximately 200,000 years. Advanced sequencing techniques revealed a genetic profile distinct from both Neanderthals and Denisovans, the two known archaic human relatives that inhabited the region.\n\n"This is truly extraordinary," said Dr. Petrov. "We\'re looking at a human relative that appears to have branched off even earlier than we previously thought possible for the region. The genetic markers suggest a population that remained isolated for tens of thousands of years."\n\nThe discovery has sparked intense interest in the scientific community, with researchers now planning expanded excavations in the surrounding area. Questions remain about what these ancient humans looked like, how they lived, and what ultimately led to their extinction.',
    image: "/placeholder.svg?height=300&width=500",
    category: "discoveries",
    date: "April 23, 2023",
    views: 2134,
  },
  {
    id: 3,
    slug: "deep-ocean-bioluminescent-ecosystem",
    title: "Unexplored Deep Ocean Reveals Bioluminescent Ecosystem",
    excerpt:
      "Marine biologists have discovered a thriving ecosystem of bioluminescent organisms in the deepest parts of the Pacific Ocean, challenging previous beliefs about deep-sea life.",
    fullContent:
      "Marine biologists exploring the Mariana Trench have discovered a thriving ecosystem of bioluminescent organisms, challenging previous beliefs about the limits of life in the deepest parts of our oceans.\n\nThe expedition, conducted using specially designed deep-sea submersibles, revealed an interconnected network of light-producing creatures that have evolved unique adaptations to survive the extreme pressure and darkness nearly 11,000 meters below the surface.\n\n\"What's remarkable is the diversity we're seeing,\" explained Dr. Maya Chen, the expedition's lead scientist. \"These aren't just isolated organisms – we're observing complex ecological relationships that depend on bioluminescence for communication, attracting prey, and even defense mechanisms.\"\n\nAmong the most surprising findings was a previously undocumented species of anglerfish that uses rhythmic light patterns rather than the typical static lure. Researchers believe this adaptation may allow it to mimic the movements of smaller bioluminescent organisms, effectively creating a more convincing trap for potential prey.",
    image: "/placeholder.svg?height=300&width=500",
    category: "discoveries",
    date: "March 18, 2023",
    views: 1853,
  },
  {
    id: 4,
    slug: "exoplanet-water-vapor-atmosphere",
    title: "Exoplanet with Water Vapor Atmosphere Discovered in Habitable Zone",
    excerpt:
      "Astronomers have identified an exoplanet with water vapor in its atmosphere located within its star's habitable zone, making it a prime candidate in the search for extraterrestrial life.",
    fullContent:
      "In a significant astronomical discovery, researchers have identified an exoplanet with substantial water vapor in its atmosphere located within its star's habitable zone. The finding marks one of the most promising candidates yet in the search for extraterrestrial life.\n\nThe planet, designated K2-418b, orbits a red dwarf star approximately 124 light-years from Earth. Using the James Webb Space Telescope's advanced spectroscopic capabilities, astronomers detected distinct water vapor signatures in the planet's atmosphere along with potential evidence of cloud formations.\n\n\"This is exactly the kind of world we've been searching for,\" said Dr. Sarah McKenzie, lead astronomer on the project. \"A rocky planet with moderate temperatures in the habitable zone, showing clear evidence of water vapor – the combination makes K2-418b an extremely compelling target for future research.\"\n\nWhile the presence of water vapor doesn't guarantee that liquid water exists on the surface or that life is present, it significantly increases the planet's astrobiological interest. The research team has already secured additional observation time to analyze the atmosphere for potential biosignatures such as methane and oxygen combinations that could indicate biological processes.",
    image: "/placeholder.svg?height=300&width=500",
    category: "discoveries",
    date: "February 5, 2023",
    views: 3276,
  },
]

export const inventionsArticles: Article[] = [
  {
    id: 5,
    slug: "biodegradable-microchip-technology",
    title: "Biodegradable Microchip Technology Opens New Medical Frontiers",
    excerpt:
      "Engineers have developed fully biodegradable microchips that can be safely implanted in the human body for temporary medical applications before dissolving completely.",
    fullContent:
      'Engineers at the Institute for Advanced Materials have developed fully biodegradable microchips that can be safely implanted in the human body for temporary medical applications before dissolving completely. This breakthrough opens new frontiers for medical monitoring and drug delivery systems.\n\nUnlike conventional electronics that require surgical removal or remain permanently in the body, these innovative chips are made from silicon-based compounds modified with specialized polymers that break down into harmless byproducts over a predetermined period.\n\n"The ability to program both the functional lifespan and dissolution rate gives us unprecedented control," said Professor James Chen, who led the research team. "We can create devices that monitor healing after surgery for exactly six weeks, or deliver targeted medication for precisely three months, before safely dissolving without a trace."\n\nThe technology has already shown promise in early clinical trials for post-surgical infection monitoring. Small sensor arrays implanted at surgical sites can detect early signs of infection and wirelessly transmit data to healthcare providers, potentially catching complications days before symptoms would become noticeable.\n\nBeyond immediate medical applications, researchers envision environmental monitoring uses where temporary electronics could be deployed in natural settings without leaving lasting waste or requiring retrieval.',
    image: "/placeholder.svg?height=300&width=500",
    category: "inventions",
    date: "May 2, 2023",
    views: 1943,
  },
  {
    id: 6,
    slug: "artificial-leaf-carbon-capture",
    title: "Artificial Leaf Technology Achieves Record Carbon Capture Efficiency",
    excerpt:
      "Scientists have created a solar-powered 'artificial leaf' device that converts atmospheric CO2 into usable fuel with unprecedented efficiency, potentially transforming climate change mitigation efforts.",
    fullContent:
      'Scientists at the Sustainable Energy Research Center have created a solar-powered \'artificial leaf\' device that converts atmospheric CO2 into usable fuel with unprecedented efficiency, potentially transforming climate change mitigation efforts.\n\nThe breakthrough technology mimics natural photosynthesis but achieves conversion rates nearly ten times more efficient than natural plants. Using specialized catalysts and a multi-layer design, the device can capture carbon dioxide directly from ambient air and transform it into energy-dense hydrocarbon fuels.\n\n"What makes our approach unique is that we\'ve managed to combine carbon capture and fuel production in a single, integrated system that runs entirely on solar energy," explained Dr. Amara Johnson, lead researcher on the project. "Previous attempts required separate processes and substantial energy inputs, limiting their practical application."\n\nEach artificial leaf unit, approximately the size of a standard sheet of paper, can remove up to 3.5 kilograms of carbon dioxide from the atmosphere annually. When deployed in large arrays, the technology could provide both meaningful carbon reduction and a sustainable fuel source for applications where electrification remains challenging, such as aviation.',
    image: "/placeholder.svg?height=300&width=500",
    category: "inventions",
    date: "April 15, 2023",
    views: 2567,
  },
  {
    id: 7,
    slug: "neuromorphic-computing-brain-chips",
    title: "Neuromorphic Computing Breakthrough: Brain-Inspired Chips Process Information Like Human Neurons",
    excerpt:
      "A revolutionary neuromorphic computing architecture mimics human brain function with unprecedented accuracy, promising dramatic advances in AI while consuming a fraction of the energy of conventional systems.",
    fullContent:
      "A team of researchers from the Neuromorphic Systems Laboratory has developed a revolutionary computing architecture that mimics human brain function with unprecedented accuracy. The breakthrough promises dramatic advances in artificial intelligence while consuming a fraction of the energy required by conventional computing systems.\n\nUnlike traditional von Neumann computer architectures that separate memory and processing, these new 'brain-inspired' chips integrate both functions through synthetic neurons and synapses that can adapt and reconfigure based on the data they process – similar to how biological brains learn and form memories.\n\n\"We're finally seeing hardware that truly captures the essence of neural processing,\" said Dr. Thomas Wei, director of the laboratory. \"These chips don't just simulate neural networks in software – they physically embody the neural architecture in their design, which unlocks extraordinary efficiency and new capabilities.\"\n\nIn benchmark tests, the neuromorphic system demonstrated the ability to recognize complex patterns and adapt to new information without explicit programming, while consuming less than 1% of the power required by GPU-based AI systems performing comparable tasks.",
    image: "/placeholder.svg?height=300&width=500",
    category: "inventions",
    date: "March 27, 2023",
    views: 3782,
  },
]

export const interventionsArticles: Article[] = [
  {
    id: 8,
    slug: "coral-reef-restoration-genetically-enhanced",
    title: "Genetically Enhanced Coral Successfully Deployed in Great Barrier Reef Restoration Project",
    excerpt:
      "Marine biologists have deployed genetically enhanced coral species designed to withstand higher ocean temperatures in a large-scale restoration project at the Great Barrier Reef.",
    fullContent:
      "Marine biologists have successfully deployed genetically enhanced coral species designed to withstand higher ocean temperatures in a large-scale restoration project at Australia's Great Barrier Reef. The intervention represents a new frontier in efforts to preserve marine ecosystems threatened by climate change.\n\nThe enhanced corals were developed through a selective breeding program that identified naturally heat-resistant coral specimens and accelerated their adaptive traits. Unlike controversial genetic modification approaches, this technique works with the coral's existing genetic diversity to speed up adaptation processes that would otherwise take centuries.\n\n\"What we're essentially doing is helping evolution catch up to the pace of climate change,\" explained Dr. Laura Foster, the project's chief scientist. \"The ocean is warming faster than these coral communities can naturally adapt, so we're giving them a carefully calculated boost.\"\n\nInitial monitoring shows promising results, with the enhanced corals demonstrating a 93% survival rate through recent marine heat waves that caused significant bleaching in surrounding natural coral populations. The project aims to establish resilient coral 'outposts' that can eventually repopulate larger reef areas through natural reproduction.",
    image: "/placeholder.svg?height=300&width=500",
    category: "interventions",
    date: "May 8, 2023",
    views: 1832,
  },
  {
    id: 9,
    slug: "autonomous-reforestation-drones",
    title: "Autonomous Drone Network Achieves Record Reforestation in Amazon Rainforest",
    excerpt:
      "A fleet of AI-powered drones has successfully planted and monitored over one million native tree seedlings in deforested areas of the Amazon, demonstrating a scalable approach to ecosystem restoration.",
    fullContent:
      'A fleet of AI-powered drones has successfully planted and monitored over one million native tree seedlings in deforested areas of the Amazon rainforest, demonstrating a scalable approach to ecosystem restoration that could transform conservation efforts worldwide.\n\nThe autonomous reforestation system, developed by environmental technology company GreenSeed, combines high-precision mapping, seed-firing drones, and monitoring systems that track the growth and health of planted areas. The drones use sophisticated algorithms to identify optimal planting locations, soil conditions, and species compatibility.\n\n"The scale and efficiency this technology enables is game-changing," said Carlos Mendez, GreenSeed\'s director of forest restoration. "What would have taken a human planting team years to accomplish, our drone network completed in just under three months, at approximately one-eighth the cost."\n\nParticularly impressive is the project\'s survival rate – preliminary data indicates that 86% of drone-planted seedlings successfully established themselves, comparable to careful manual planting but significantly higher than traditional aerial seeding methods. The monitoring drones continue to provide valuable data on forest regeneration patterns that will inform future restoration efforts.',
    image: "/placeholder.svg?height=300&width=500",
    category: "interventions",
    date: "April 12, 2023",
    views: 2054,
  },
  {
    id: 10,
    slug: "ocean-microplastic-filtration-system",
    title: "Revolutionary Ocean Microplastic Filtration System Deployed in Pacific Garbage Patch",
    excerpt:
      "Engineers have launched an innovative floating filtration system designed to capture microplastics from ocean water without harming marine life, with the first large-scale deployment targeting the Pacific Garbage Patch.",
    fullContent:
      'Engineers from the Ocean Cleanup Initiative have launched an innovative floating filtration system designed to capture microplastics from ocean water without harming marine life. The first large-scale deployment is now operational in the Great Pacific Garbage Patch, representing a significant advancement in addressing one of the most persistent forms of marine pollution.\n\nUnlike previous cleanup efforts that focused on larger plastic debris, this new system specifically targets microplastics – particles smaller than 5mm that are nearly impossible to remove with conventional methods. The technology uses a combination of passive water flow, specialized membranes, and electrostatic charging to capture particles as small as 100 micrometers.\n\n"Microplastics represent a particularly insidious threat to marine ecosystems because they\'re ingested by organisms at every level of the food chain," explained Dr. Hiroshi Tanaka, the project\'s chief engineer. "Our system is the first viable approach to actually reducing their concentration in open ocean environments."\n\nThe filtration units are powered entirely by renewable energy, using a combination of solar panels and wave-motion generators. Each unit can process approximately 2.5 million liters of seawater daily while specially designed sensors and channels ensure marine life can safely navigate around and through the system.',
    image: "/placeholder.svg?height=300&width=500",
    category: "interventions",
    date: "March 3, 2023",
    views: 2976,
  },
]

// This function will be used to find an article by its slug
export function findArticleBySlug(slug: string): Article | undefined {
  const allArticles = [featuredArticle, ...discoveriesArticles, ...inventionsArticles, ...interventionsArticles]

  return allArticles.find((article) => article.slug === slug)
}
