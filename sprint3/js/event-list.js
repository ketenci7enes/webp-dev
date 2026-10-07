import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const arama = document.getElementById("arama");
const kategoriFiltre = document.getElementById("kategori-filtre");
const sonucSatiri = document.getElementById("sonuc");

function createCard(event) {
    const dateObj = new Date(event.date);
    const dateStr = dateObj.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
    
    return `<article>
        <h3>${event.title}</h3>
        <p>${event.category}</p>
        <p>Tarih: ${dateStr}, ${event.time}</p>
        <p>Yer: ${event.location}</p>
        <p>Kontenjan: ${event.capacity} kişi</p>
        <p>${event.description}</p>
        <a href="etkinlik-detay.html?id=${event.id}">Detayları gör &rarr;</a>
    </article>`;
}

function render(dizi) {
    if (dizi.length === 0) {
        if (sonucSatiri) sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
        list.innerHTML = "";
    } else {
        list.innerHTML = dizi.map(createCard).join("");
        if (sonucSatiri) sonucSatiri.textContent = `${dizi.length} etkinlik listeleniyor.`;
    }
}

if (kategoriFiltre) {
    const kategoriler = [...new Set(events.map(e => e.category))];
    kategoriler.forEach(cat => {
        kategoriFiltre.innerHTML += `<option value="${cat}">${cat}</option>`;
    });

    const filtrele = (e) => {
        if (e && e.type === "submit") e.preventDefault();
        
        const aranan = arama.value.toLocaleLowerCase("tr-TR");
        const secilenKategori = kategoriFiltre.value;
        
        const sonuc = events.filter(ev => {
            const metinUyuyor = ev.title.toLocaleLowerCase("tr-TR").includes(aranan) || 
                                ev.description.toLocaleLowerCase("tr-TR").includes(aranan);
            const kategoriUyuyor = secilenKategori === "" || ev.category === secilenKategori;
            return metinUyuyor && kategoriUyuyor;
        });
        
        render(sonuc);
    };

    arama.addEventListener("input", filtrele);
    kategoriFiltre.addEventListener("change", filtrele);
    
    const filtreFormu = document.getElementById("filtre-formu");
    if (filtreFormu) {
        filtreFormu.addEventListener("submit", filtrele);
    }
}

if (list) {
    if (list.dataset.limit) {
        const yaklasan = [...events]
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, Number(list.dataset.limit));
        render(yaklasan);
        if (sonucSatiri) sonucSatiri.textContent = "";
    } else {
        render(events);
    }
}
