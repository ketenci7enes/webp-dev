import { createContext, useContext, useState, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent, EventFormData } from "../types/campus-event";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, data: EventFormData, image?: string): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as CampusEvent["category"],
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
    ...(image ? { image } : {}),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    setEvents((current) => [
      ...current,
      toEvent(`event-${Date.now()}`, data, "/afis.svg"),
    ]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents((current) =>
      current.map((event) =>
        event.id === id ? toEvent(id, data, event.image) : event
      )
    );
  }

  function deleteEvent(id: string) {
    setEvents((current) => current.filter((event) => event.id !== id));
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("Provider yok");
  return value;
}
