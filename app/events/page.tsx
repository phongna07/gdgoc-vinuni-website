import type { Metadata } from "next";
import { EventsExplorer } from "@/components/events-explorer";
import { JoinBanner, PageHeader } from "@/components/ui";
import { EVENT_TYPES, getEvents, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Workshops, hackathons, talks and community days run or joined by GDG on Campus VinUniversity.",
};

export default function EventsPage() {
  // keep the payload sent to the client filter small: no body HTML, no gallery
  const events = getEvents().map((e) => ({ ...e, html: "", gallery: [] }));
  const types = Object.entries(EVENT_TYPES).map(([id, t]) => ({ id, label: t.label }));

  return (
    <>
      <PageHeader path="/events" title="Events">
        Everything we have hosted, co-organised or shown up for since {site.foundedYear}. Open any event for the
        recap and photos.
      </PageHeader>
      <section className="wrap mt-12">
        <EventsExplorer events={events} types={types} />
      </section>
      <JoinBanner
        open={site.recruitment.open}
        period={site.recruitment.period}
        generation={site.recruitment.generation}
      />
    </>
  );
}
