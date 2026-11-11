# Kampüs Etkinlikleri - Backend API

Node.js ve Express ile geliştirilmiş REST API servisi.

## Çalıştırma Komutları

Gereksinimlerin yüklenmesi:
```bash
npm install
```

Geliştirme sunucusunun başlatılması (otomatik yeniden başlatma ile):
```bash
npm run dev
```

Üretim sunucusunun başlatılması:
```bash
npm start
```

## Ortam Değişkenleri (.env)

Sunucu portu `.env` dosyasından okunur:
```env
PORT=3000
```
Tanımlanmadığı takdirde varsayılan olarak `3000` portu kullanılır. `.env.example` dosyası örnek şablonu içerir.

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /events | Listeyi getir | 200 | - | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

### Status Kodları

- **200 OK**: Başarılı istek
- **201 Created**: Yeni kayıt oluşturuldu
- **204 No Content**: İçerik yok (silme başarılı)
- **400 Bad Request**: Eksik veya hatalı veri
- **404 Not Found**: Kaynak bulunamadı

### Hata Yanıt Formatı

Tüm hata yanıtları standart JSON formatında döner:
```json
{
  "error": {
    "message": "Event not found"
  }
}
```
