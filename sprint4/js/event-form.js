import { events } from "./data.js";

const form = document.getElementById("etkinlik-formu");
const mesajKutusu = document.getElementById("form-mesaj");

if (form && form.dataset.mode === "guncelle") {
    const id = new URLSearchParams(location.search).get("id");
    const etkinlik = events.find((e) => e.id === id);
    
    if (etkinlik) {
        form.elements.ad.value = etkinlik.title;
        form.elements.kategori.value = etkinlik.category;
        form.elements.tarih.value = etkinlik.date;
        form.elements.saat.value = etkinlik.time;
        form.elements.yer.value = etkinlik.location;
        if (etkinlik.capacity) form.elements.kontenjan.value = etkinlik.capacity;
        if (etkinlik.description) form.elements.aciklama.value = etkinlik.description;
    } else {
        form.outerHTML = `
            <div class="hata-kutusu" style="margin-bottom: 20px;">
                Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
            </div>
            <a href="etkinlikler.html" style="display:inline-block; padding:10px 20px; background:var(--renk-ana); color:white; text-decoration:none; border-radius:var(--kose);">Etkinliklere git</a>
        `;
    }
}

if (form && form.tagName === 'FORM') {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const data = {
            id: form.dataset.mode === "guncelle" ? new URLSearchParams(location.search).get("id") : "event-7",
            title: fd.get("ad") ? fd.get("ad").trim() : "",
            category: fd.get("kategori") || "",
            date: fd.get("tarih") || "",
            time: fd.get("saat") || "",
            location: fd.get("yer") ? fd.get("yer").trim() : "",
            capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
            description: fd.get("aciklama") ? fd.get("aciklama").trim() : ""
        };

        const errors = {};
        
        const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan", "aciklama"];
        alanlar.forEach(isim => {
            const el = form.elements[isim];
            if (el) el.setAttribute("aria-invalid", "false");
            const hataSpan = document.getElementById(`${isim}-hata`);
            if (hataSpan) hataSpan.textContent = "";
        });

        if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
        if (!data.category) errors.kategori = "Bir kategori seçin.";
        if (!data.date) errors.tarih = "Tarih seçin.";
        if (!data.time) errors.saat = "Saat seçin.";
        if (!data.location) errors.yer = "Yer bilgisini yazın.";
        if (fd.get("kontenjan") && (data.capacity < 1 || data.capacity > 1000)) {
            errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
        }

        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach(key => {
                form.elements[key].setAttribute("aria-invalid", "true");
                const hataSpan = document.getElementById(`${key}-hata`);
                if (hataSpan) hataSpan.textContent = errors[key];
            });
            if (mesajKutusu) mesajKutusu.innerHTML = "";
            return;
        }

        const prefix = form.dataset.mode === "guncelle" ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu";
        if (mesajKutusu) {
            mesajKutusu.innerHTML = `
                <div class="basari-kutusu">
                    <p>${prefix} (bu sprintte kaydedilmez):</p>
                    <pre style="margin:0; font-family:monospace; white-space:pre-wrap;">${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        }
    });
}
