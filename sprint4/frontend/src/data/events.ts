import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 120,
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    image: "/afis.svg"
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    capacity: 50,
    date: "2026-10-27",
    time: "13:00",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
    image: "/afis.svg"
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-11-03",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
    image: "/afis.svg"
  },
  {
    id: "event-5",
    title: "Girişimcilik Paneli",
    category: "Seminer",
    capacity: 200,
    date: "2026-11-15",
    time: "11:00",
    location: "Kültür Merkezi",
    description: "Başarılı girişimcilerin hikayeleri.",
    image: "/afis.svg"
  },
  {
    id: "event-6",
    title: "Oyun Geliştirme Temelleri",
    category: "Atölye",
    capacity: 25,
    date: "2026-11-20",
    time: "16:00",
    location: "Mac Laboratuvarı",
    description: "Unity ile basit bir platform oyunu.",
    image: "/afis.svg"
  }
];