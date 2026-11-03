import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
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
          <Link className="buton buton-ikincil" to="/events">
            &larr; Listeye dön
          </Link>
          <Link className="buton" to={`/admin/${event.id}/edit`}>
            Bu etkinliği güncelle
          </Link>
        </div>
      </div>
    </article>
  );
}
export default EventDetail;
