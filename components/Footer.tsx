import { person } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mt-28 md:mt-40">
      <div className="shell">
        <div className="hr" />
        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="label">
            &copy; MMXXVI {person.name} — {person.location}
          </p>
          <p className="label hidden md:block">
            Next.js · Three.js · No database, no CMS
          </p>
          <a href="#top" className="label wipe text-bone">
            Back to top &#8599;
          </a>
        </div>
      </div>
    </footer>
  );
}
