import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import Metrics from "@/components/Metrics";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { about, hero, person, work } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  email: `mailto:${person.email}`,
  telephone: person.phone,
  description: hero.lede,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: about.facts.find((f) => f.k === "University")?.v,
  },
  sameAs: [person.github, person.linkedin],
  worksFor: work.map((item) => ({
    "@type": "Organization",
    name: item.company,
  })),
  knowsAbout: [
    "Node.js",
    "TypeScript",
    "Next.js",
    "PostgreSQL",
    "GraphQL",
    "AI voice agents",
    "Performance optimization",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Metrics />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
