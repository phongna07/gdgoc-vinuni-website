import type { Metadata } from "next";
import { TeamSwitcher } from "@/components/team-switcher";
import { JoinBanner, PageHeader } from "@/components/ui";
import { getGenerations, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description: "The people of GDG on Campus VinUniversity, generation by generation.",
};

export default function TeamPage() {
  const generations = getGenerations();
  return (
    <>
      <PageHeader path="/team" title="Team">
        Every year a new generation takes over the club. Pick one to see who built it.
      </PageHeader>
      <section className="wrap mt-12">
        <TeamSwitcher generations={generations} />
      </section>
      <JoinBanner
        open={site.recruitment.open}
        period={site.recruitment.period}
        generation={site.recruitment.generation}
      />
    </>
  );
}
