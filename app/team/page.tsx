import type { Metadata } from "next";
import Image from "next/image";
import SubpageShell from "@/components/site/SubpageShell";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the venture team and strategic advisors developing InterAcTec from translational research toward an independent spin-out.",
  alternates: { canonical: "/team" },
  openGraph: { url: "/team", title: "Team | InterAcTec" },
};

const VENTURE_TEAM = [
  {
    name: "Schayan Yousefian",
    role: "Scientific Lead · CSO-designate",
    image: "/team/schayan-yousefian.jpg",
    imagePosition: "object-[center_42%]",
    bio: "Leads the scientific strategy and development of InterAcTec, from immune-panel design and interaction mapping to translational applications.",
  },
  {
    name: "Dr. Steffen Schabel",
    role: "Business Operations Lead",
    image: "/team/steffen-schabel.jpg",
    imagePosition: "object-[center_28%]",
    bio: "Leads business operations and the preparation of InterAcTec's path from research project to an independent life-science venture.",
  },
];

const ADVISORS = [
  {
    name: "Prof. Dr. Simon Haas",
    role: "Strategic Advisor · Scientific Strategy",
    image: "/team/simon-haas.jpg",
    imagePosition: "object-center",
    bio: "Advises the project on scientific strategy, technology development and its wider research network.",
  },
  {
    name: "PD Dr. Dr. Daniel Hübschmann",
    role: "Strategic Advisor · Medical & AI Strategy",
    image: "/team/daniel-huebschmann.jpg",
    imagePosition: "object-[center_34%]",
    bio: "Advises the project on medical translation, computational analysis and AI strategy.",
  },
];

export default function TeamPage() {
  return (
    <SubpageShell
      kicker="Team"
      title="Scientific depth for a translational venture."
      intro={
        <>
          InterAcTec is a pre-spin-out project developed from research at Charité – Universitätsmedizin Berlin and the
          German Cancer Research Center (DKFZ) in Heidelberg. The team is working toward an independent spin-out by the
          end of 2026.
        </>
      }
    >
      <section aria-labelledby="venture-team-title" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-deep">Venture team</p>
            <h2 id="venture-team-title" className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Building the science and the business.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
              The team combines experience in immune profiling, translational oncology and the development of
              life-science ventures.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:col-span-8">
            {VENTURE_TEAM.map((person) => (
              <Profile key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="advisors-title" className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-violet-deep">Strategic advisors</p>
              <h2 id="advisors-title" className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
                Guidance across science, medicine and AI.
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:col-span-8">
              {ADVISORS.map((person) => (
                <Profile key={person.name} person={person} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="project-status-title" className="bg-ink-2 text-paper">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal lg:col-span-3">Project status</p>
          <div className="lg:col-span-8">
            <h2 id="project-status-title" className="text-2xl font-medium tracking-tight sm:text-3xl">
              InterAcTec is currently a pre-incorporation project.
            </h2>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}

type Person = (typeof VENTURE_TEAM)[number] | (typeof ADVISORS)[number];

function Profile({ person }: { person: Person }) {
  return (
    <article className="bg-white/75 p-6 sm:p-7">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-2">
        <Image
          src={person.image}
          alt={`Portrait of ${person.name}`}
          fill
          className={`object-cover ${person.imagePosition}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
        />
      </div>
      <h3 className="mt-6 text-2xl font-medium tracking-tight">{person.name}</h3>
      <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-teal-deep">
        {person.role}
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{person.bio}</p>
    </article>
  );
}
