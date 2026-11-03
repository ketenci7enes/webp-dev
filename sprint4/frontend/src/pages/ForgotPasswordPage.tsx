import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@")
      ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <section>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p>
        Kayıtlı e-posta adresinizi girin; şifre sıfırlama bağlantısı
        gönderelim. (Bu bir demo sayfasıdır.)
      </p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">E-posta *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          <span className="hata-metni">{error}</span>
        </div>
        <button type="submit">Bağlantı gönder</button>
      </form>

      {sent && (
        <p className="mesaj mesaj-basari">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <p>
        <Link to="/login">&larr; Girişe dön</Link>
      </p>
    </section>
  );
}
export default ForgotPasswordPage;
