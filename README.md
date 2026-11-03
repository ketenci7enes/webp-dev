# Kampüs Etkinlikleri

Fakültedeki seminer, atölye, söyleşi ve yarışmaları tek yerden takip etmeyi
sağlayan React + TypeScript uygulaması. Proje, HTML/CSS sprintlerinden başlayıp
React Router, Context ve CRUD işlemleriyle tamamlanan bir frontend geliştirme
sürecinin sonucudur.

## Canlı URL

> Vercel adresi: `https://isimsoyisim-frontend.vercel.app`
>
> Yayına alındıktan sonra bu satır gerçek adresle güncellenecektir.

## Kullanılan Teknolojiler

- React 19
- TypeScript
- Vite
- React Router DOM 7
- Context API
- Saf CSS (responsive, mobil öncelikli)

## Özellikler

- **10 adres / 10 sayfa:** React Router ile gerçek URL'ler ve SPA gezinme
- **Ortak veri yönetimi:** `EventsContext` sayesinde etkinlik listesi tüm
  sayfalarda aynı kaynaktan okunur
- **Ekle / Güncelle / Sil:** Yönetim panelinden yapılan değişiklikler ana sayfa,
  etkinlikler ve detay sayfalarına anında yansır
- **Silme onayı:** Silmeden önce `window.confirm` ile kullanıcıdan onay alınır
- **Controlled form:** Etkinlik formundaki tüm alanlar tek state nesnesiyle
  yönetilir
- **Form doğrulama:** Etkinlik adı, kategori, tarih, saat, yer, kontenjan
  (1–1000) ve açıklama (en az 10 karakter) kuralları
- **Arama ve filtreleme:** Etkinlik adı/açıklamasında arama, kategoriye göre
  filtreleme
- **Giriş, kayıt ve şifremi unuttum:** Demo doğrulama ve başarı mesajları
- **404 sayfası:** Tanımsız adreslerde "Sayfa bulunamadı" ekranı
- **Responsive tasarım:** Mobilde tablo satırları karta dönüşür; dokunmatik
  hedefler ve okunabilir yerleşim korunur

## Route Listesi

| Adres | Sayfa | Açıklama |
|---|---|---|
| `/` | HomePage | Yaklaşan 2 etkinlik |
| `/events` | EventsPage | Tüm etkinlikler, arama ve filtre |
| `/events/:id` | EventDetailPage | Etkinlik detayı |
| `/login` | LoginPage | Giriş (demo) |
| `/register` | RegisterPage | Kayıt (demo) |
| `/forgot-password` | ForgotPasswordPage | Şifre sıfırlama (demo) |
| `/admin` | AdminPage | Yönetim tablosu |
| `/admin/new` | AddEventPage | Yeni etkinlik |
| `/admin/:id/edit` | EditEventPage | Etkinlik güncelleme |
| `*` | NotFoundPage | 404 |

## Kurulum

```bash
cd sprint4/frontend
npm install
npm run dev
```

Geliştirme sunucusu: `http://localhost:5173`

Üretim derlemesi ve önizleme:

```bash
npm run build
npm run preview
```

Önizleme: `http://localhost:4173`

## Proje Yapısı

```text
sprint4/frontend/
  src/
    components/
      events/   EventCard, EventList, EventFilter, EventDetail
      forms/    EventForm
      layout/   Header, Navigation, Footer
    context/    EventsContext.tsx
    pages/      HomePage, EventsPage, EventDetailPage, AdminPage,
                AddEventPage, EditEventPage, LoginPage, RegisterPage,
                ForgotPasswordPage, NotFoundPage
    data/       events.ts
    types/      campus-event.ts
    utils/      filter-events.ts, format-date.ts, validate-event.ts
    App.tsx
    App.css
    main.tsx
```

## Sprint Geçmişi

| Sprint | İçerik |
|---|---|
| Sprint 1 | Semantik HTML iskeleti |
| Sprint 2 | CSS ile görsel tasarım |
| Sprint 3 | Duyarlı tasarım ve JavaScript |
| Sprint 4 | React'e geçiş, bileşen yapısı |
| Sprint 5 | React bileşenleri ve veri akışı |
| Sprint 6 | React Router, Context, form doğrulama, CRUD |

## Vercel

Vercel projesinde **Root Directory** olarak `sprint4/frontend` seçilmelidir.
`vercel.json` içindeki rewrite kuralı sayesinde `/events/event-2` gibi adresler
yenilendiğinde 404 yerine uygulama açılır.
