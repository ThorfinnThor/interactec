import Link from "next/link";
import { CONTACT_EMAIL, isLegalComplete } from "@/lib/legal";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-mist">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-4 py-8 text-[14px] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} InterAcTec</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/science" className="hover:text-paper">
            Science
          </Link>
          <Link href="/case-studies" className="hover:text-paper">
            Case studies
          </Link>
          <Link href="/#contact" className="hover:text-paper">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-paper">
            Privacy
          </Link>
          {isLegalComplete() && (
            <Link href="/impressum" className="hover:text-paper">
              Impressum
            </Link>
          )}
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-paper">
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
    </footer>
  );
}
