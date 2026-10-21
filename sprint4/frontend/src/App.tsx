import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";
function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }
  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const title = page === "home"
    ? "Kampüs Etkinlikleri"
    : page === "events"
    ? "Tüm Etkinlikler"
    : page === "detail" && selected
    ? selected.title
    : page === "add"
    ? "Etkinlik Ekle"
    : "Etkinlik Güncelle";

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  return (
    <>
      <Header title={title}>
        <Navigation current={page} onNavigate={go} />
      </Header>

      <main>
        {page === "home" && (
          <section>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <section className="etkinlik-listesi yaklasan-etkinlikler" data-limit="2">
              <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            </section>
            <p style={{ marginTop: "var(--bosluk-m)" }}>
              <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>Tüm etkinlikleri gör &rarr;</a>
            </p>
          </section>
        )}

        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
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
              <EventList events={filtered} onShowDetail={(id) => go("detail", id)} emptyText="Etkinlik bulunamadı." />
            </section>
          </section>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}
        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
export default App;