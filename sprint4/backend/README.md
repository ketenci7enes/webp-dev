# Kampüs Etkinlikleri - Backend API

Node.js, Express ve MongoDB (Mongoose) ile geliştirilmiş REST API servisi.

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

Örnek verilerin veritabanına yüklenmesi (önce mevcut kayıtları siler):
```bash
npm run seed
```

## Ortam Değişkenleri (.env)

Sunucu portu ve veritabanı adresi `.env` dosyasından okunur:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```
`PORT` tanımlanmadığı takdirde varsayılan olarak `3000` portu kullanılır.
`MONGODB_URI` zorunludur; gerçek Atlas adresi yalnızca yereldeki `.env`
dosyasında tutulur ve repoya eklenmez. `.env.example` dosyası yer tutucu
değerler içeren şablonu barındırır.

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
