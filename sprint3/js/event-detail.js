import { events } from "./data.js";

const container = document.getElementById("detay");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
    container.innerHTML = `
        <div class="hata-kutusu" style="margin-bottom: 20px;">
            "${id || 'id yok'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
        </div>
        <a href="etkinlikler.html" style="display:inline-block; padding:10px 20px; background:var(--renk-ana); color:white; text-decoration:none; border-radius:var(--kose);">&larr; Listeye dön</a>
    `;
} else {
    document.title = `${event.title} - Kampüs Etkinlikleri`;
    const dateObj = new Date(event.date);
    const dateStr = dateObj.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
    
    container.innerHTML = `
        <figure>
            ${event.image 
                ? `<img src="${event.image}" alt="${event.title} afişi" style="width:100%; max-height:360px; object-fit:cover; border-radius:var(--kose); display:block;">` 
                : `<div style="background-color: #d1d5db; padding: 40px; text-align: center; border-radius: 8px; color:#333;">afiş görseli</div>`
            }
            <figcaption style="margin-top:8px;">Şekil 1: ${event.title} afişi</figcaption>
        </figure>
        
        <div>
            <h2 style="margin-top:0; color:var(--renk-ana);">${event.title}</h2>
            <dl>
                <dt>Tarih</dt>
                <dd><time datetime="${event.date}T${event.time}">${dateStr}, ${event.time}</time></dd>
                <dt>Yer</dt>
                <dd>${event.location}</dd>
                <dt>Kategori</dt>
                <dd>${event.category}</dd>
                <dt>Kontenjan</dt>
                <dd>${event.capacity} kişi</dd>
            </dl>
            <h3 style="margin-top: var(--bosluk-m); color:var(--renk-ana);">Açıklama</h3>
            <p>${event.description}</p>
            <div style="margin-top: 20px; display:flex; gap: 10px; flex-wrap: wrap;">
                <a href="etkinlikler.html" style="padding:10px 20px; background:var(--renk-ana); color:white; text-decoration:none; border-radius:var(--kose);">&larr; Listeye dön</a>
                <a href="etkinlik-guncelle.html?id=${event.id}" style="padding:10px 20px; background:var(--renk-ana); color:white; text-decoration:none; border-radius:var(--kose);">Bu etkinliği güncelle</a>
            </div>
        </div>
    `;
}
