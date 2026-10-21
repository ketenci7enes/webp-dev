interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form className="form" onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <div>
          <label htmlFor="ad">Etkinlik Adı *</label>
          <input type="text" id="ad" name="ad" required maxLength={80} />
        </div>
        <div>
          <label htmlFor="kategori">Kategori *</label>
          <select id="kategori" name="kategori" required>
            <option value="" disabled>Seçiniz ▾</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </div>
        <div>
          <label htmlFor="tarih">Tarih *</label>
          <input type="date" id="tarih" name="tarih" required />
        </div>
        <div>
          <label htmlFor="saat">Saat *</label>
          <input type="time" id="saat" name="saat" required />
        </div>
        <div>
          <label htmlFor="yer">Yer *</label>
          <input type="text" id="yer" name="yer" placeholder="Örn. A Blok Konferans Salonu" required />
        </div>
        <div>
          <label htmlFor="kontenjan">Kontenjan</label>
          <input type="number" id="kontenjan" name="kontenjan" />
        </div>
        <div>
          <label htmlFor="aciklama">Açıklama</label>
          <textarea id="aciklama" name="aciklama" rows={5} />
        </div>
        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}
export default EventForm;