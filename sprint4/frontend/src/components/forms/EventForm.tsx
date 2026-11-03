import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  CATEGORIES,
  type EventFormData,
  type EventFormErrors,
} from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(e: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0)
      onSubmit(data);
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="title">Etkinlik Adı *</label>
        <input
          id="title"
          name="title"
          type="text"
          maxLength={80}
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        <span className="hata-metni">{errors.title}</span>
      </div>

      <div>
        <label htmlFor="category">Kategori *</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz &#9662;</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <span className="hata-metni">{errors.category}</span>
      </div>

      <div>
        <label htmlFor="date">Tarih *</label>
        <input
          id="date"
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        <span className="hata-metni">{errors.date}</span>
      </div>

      <div>
        <label htmlFor="time">Saat *</label>
        <input
          id="time"
          name="time"
          type="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        <span className="hata-metni">{errors.time}</span>
      </div>

      <div>
        <label htmlFor="location">Yer *</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Örn. A Blok Konferans Salonu"
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        <span className="hata-metni">{errors.location}</span>
      </div>

      <div>
        <label htmlFor="capacity">Kontenjan *</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          min={1}
          max={1000}
          step={1}
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        <span className="hata-metni">{errors.capacity}</span>
      </div>

      <div>
        <label htmlFor="description">Açıklama *</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        <span className="hata-metni">{errors.description}</span>
      </div>

      <button type="submit">{submitText}</button>
    </form>
  );
}
export default EventForm;
