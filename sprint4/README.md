# Kampüs Etkinlikleri

React + TypeScript + Vite ile geliştirilmiş kampüs etkinlikleri uygulaması.
Sprint 6 ve vize teslimi kapsamında React Router, Context, controlled form ve
ekle / güncelle / sil özellikleri eklenmiştir.

## Canlı URL

> Vercel adresi: `https://isimsoyisim-frontend.vercel.app` (yayına alınca bu
> satırı gerçek adresle güncelleyin.)

## Kurulum

```bash
cd sprint4/frontend
npm install
npm run dev
```

Üretim derlemesi:

```bash
npm run build
npm run preview
```

## Route Listesi

| Adres | Sayfa |
|---|---|
| `/` | HomePage |
| `/events` | EventsPage |
| `/events/:id` | EventDetailPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

## Özellikler

- React Router ile 10 adres ve SPA gezinme (`Link` / `NavLink`)
- `EventsContext` ile ortak etkinlik listesi; ekleme, güncelleme ve silme
  işlemleri tüm sayfalara anında yansır
- Silme öncesi `window.confirm` onayı
- Etkinlik formunda controlled input + alan bazlı doğrulama
- Giriş, kayıt ve şifremi unuttum sayfalarında demo doğrulama ve mesajlar
- Arama ve kategori filtresi
- Mobilde tablo satırlarını karta çeviren duyarlı tasarım

## Vercel

Vercel projesinde **Root Directory** olarak `sprint4/frontend` seçilmelidir.
`vercel.json` içindeki rewrite kuralı, `/events/event-2` gibi adreslerin
yenilenmesinde 404 yerine uygulamanın açılmasını sağlar.
