import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart" key={event.id}>
      {event.image && (
        <img 
          src={event.image} 
          alt={event.title} 
          style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "var(--kose)", marginBottom: "10px", display: "block" }}
        />
      )}
      <h3>{event.title}</h3>
      <p>{event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)} {event.time}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <p>{event.description}</p>
      <a href="#" onClick={(e) => { e.preventDefault(); onShowDetail(event.id); }}>Detayları gör &rarr;</a>
    </article>
  );
}
export default EventCard;