import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <section>
      <h2 className="bolum-baslik">Ana Sayfa</h2>
      <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      <section
        className="etkinlik-listesi yaklasan-etkinlikler"
        data-limit="2"
      >
        <EventList events={upcoming} emptyText="Henüz etkinlik yok." />
      </section>
      <p style={{ marginTop: "var(--bosluk-m)" }}>
        <Link to="/events">Tüm etkinlikleri gör &rarr;</Link>
      </p>
    </section>
  );
}
export default HomePage;
