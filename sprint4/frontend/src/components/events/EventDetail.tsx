import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay detay-layout">
      <div>
        {event.image && (
          <figure>
            <img src={event.image} alt={event.title} />
            <figcaption>{event.title}</figcaption>
          </figure>
        )}
      </div>
      <div>
        <h2>{event.title}</h2>
        <dl>
          <dt>Tarih</dt>
          <dd>{formatDate(event.date)} {event.time}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity}</dd>
        </dl>
        <section>
          <h3>Açıklama</h3>
          <p>{event.description}</p>
        </section>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={onBack}>← Listeye dön</button>
          <button onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
        </div>
      </div>
    </article>
  );
}
export default EventDetail;