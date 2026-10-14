import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { CampusEvent, Category } from "./types/campus-event";

type PageName = "home" | "events" | "detail" | "add" | "update";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>
          <strong>Tarih:</strong> {formatDate(event.date)} {event.time}
        </p>
        <p>
          <strong>Yer:</strong> {event.location}
        </p>
        <p>
          <strong>Kategori:</strong> {event.category}
        </p>
        <p>
          <strong>Kontenjan:</strong> {event.capacity}
        </p>
        <button onClick={() => go("detail", event.id)}>Detayları gör</button>
      </article>
    );
  }

  const menuItems = [
    { name: "home", label: "Ana Sayfa" },
    { name: "events", label: "Etkinlikler" },
    { name: "add", label: "Ekle" }
  ] as const;

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
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
        <nav className="menu" aria-label="Ana menü">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go(item.name);
              }}
              aria-current={page === item.name ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <section className="etkinlik-listesi yaklasan-etkinlikler">
              {upcoming.map(renderCard)}
            </section>
            <p>
              <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>Tüm etkinlikleri gör &rarr;</a>
            </p>
          </section>
        )}

        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>

            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc">
              {filtered.length === 0
                ? "Etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlikler-grid">
              {filtered.map(renderCard)}
            </section>
          </section>
        )}

        {page === "detail" && (
          <section>
            {!selected ? (
              <div className="hata-kutusu">
                <p>Etkinlik bulunamadı.</p>
                <button onClick={() => go("events")}>Listeye dön</button>
              </div>
            ) : (
              <article className="detay detay-layout">
                <div>
                  {selected.image && (
                    <figure>
                      <img src={selected.image} alt={selected.title} />
                      <figcaption>{selected.title}</figcaption>
                    </figure>
                  )}
                </div>
                <div>
                  <h2>{selected.title}</h2>
                  <dl>
                    <dt>Tarih</dt>
                    <dd>{formatDate(selected.date)} {selected.time}</dd>
                    <dt>Yer</dt>
                    <dd>{selected.location}</dd>
                    <dt>Kategori</dt>
                    <dd>{selected.category}</dd>
                    <dt>Kontenjan</dt>
                    <dd>{selected.capacity}</dd>
                  </dl>
                  <section>
                    <h3>Açıklama</h3>
                    <p>{selected.description}</p>
                  </section>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button onClick={() => go("events")}>← Listeye dön</button>
                    <button onClick={() => go("update", selected.id)}>Bu etkinliği güncelle</button>
                  </div>
                </div>
              </article>
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="ad">Etkinlik Adı *</label>
                <input type="text" id="ad" name="ad" required maxLength={80} />
              </div>
              <div>
                <label htmlFor="kategori">Kategori *</label>
                <select id="kategori" name="kategori" required>
                  <option value="" disabled>Seçiniz ▾</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>
              <div>
                <label htmlFor="tarih">Tarih *</label>
                <input type="date" id="tarih" name="tarih" required />
              </div>
              <div>
                <label htmlFor="saat">Saat *</label>
                <input type="time" id="saat" name="saat" required />
              </div>
              <div>
                <label htmlFor="yer">Yer *</label>
                <input type="text" id="yer" name="yer" placeholder="Örn. A Blok Konferans Salonu" required />
              </div>
              <div>
                <label htmlFor="kontenjan">Kontenjan</label>
                <input type="number" id="kontenjan" name="kontenjan" />
              </div>
              <div>
                <label htmlFor="aciklama">Açıklama</label>
                <textarea id="aciklama" name="aciklama" rows={5} />
              </div>
              <button type="submit">{page === "add" ? "Kaydet" : "Güncelle"}</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Mustafa Enes Ketenci &middot; 2311012811 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;