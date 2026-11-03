import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p>Aradığınız adres taşınmış ya da hiç var olmamış olabilir.</p>
      <p>
        <Link to="/">Ana sayfaya dön</Link>
      </p>
    </section>
  );
}
export default NotFoundPage;
