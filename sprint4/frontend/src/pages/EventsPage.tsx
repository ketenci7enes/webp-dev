import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import type { Category } from "../types/campus-event";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((event) => event.category))];
  const filtered = filterByCategory(
    searchEvents(events, searchText), category);

  return (
    <section>
      <h2 className="bolum-baslik">Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <p id="sonuc">
        {filtered.length === 0
          ? "Etkinlik bulunamadı."
          : `${filtered.length} etkinlik listeleniyor.`}
      </p>
      <section id="etkinlik-listesi" className="etkinlikler-grid">
        <EventList
          events={filtered}
          emptyText="Etkinlik bulunamadı."
        />
      </section>
    </section>
  );
}
export default EventsPage;
