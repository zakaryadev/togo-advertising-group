import Link from "next/link";

export default function Services() {
  const categories = [
    {
      n: "01",
      title: "Obyomli va Yorug'lik Harflari",
      desc: "7 xil texnologiyada: akril bortli, konturli, alyukabond va diodli harflar va LED peshtoq reklamalari.",
    },
    {
      n: "02",
      title: "Kran va Balandlik Reklamasi",
      desc: "Minorali kran strelasi va minorasiga banner yoki setka o'rnatish. Injiniring va alpinistlar brigadasi.",
    },
    {
      n: "03",
      title: "Katta Formatli va UV Bosma",
      desc: "3.2m kenglikgacha, 1440 dpi sifatda banner, orakal, setka hamda qattiq yuzalarga UV bosma.",
    },
    {
      n: "04",
      title: "Poligrafiya va Bosmaxona",
      desc: "Flayer, buklet, katalog, firmentiy papka, bloknot, kalendar hamda yuqori sifatli vizitkalar.",
    },
    {
      n: "05",
      title: "Ko'rgazma va Mobil Stendlar",
      desc: "Press-wall, roll-up, parus bayroqlar, promo stendlar hamda eksklyuziv ko'rgazma pavilyonlari.",
    },
    {
      n: "06",
      title: "Avto Reklama va Brendlash",
      desc: "Engil va yuk avtomobillari, avtobus hamda maxsus texnikalarni vinil plenka bilan brendlash.",
    },
  ];

  return (
    <section className="wrap" id="yonalish">
      <div className="kick">XIZMATLARIMIZ</div>
      <h2>Biz tayyorlaydigan asosiy reklama va bosma turlari</h2>
      <p className="slead">
        Loyihangiz g'oyasidan boshlab o'lchov olish, 3D vizualizatsiya, o'z sexlarimizda ishlab chiqarish va montajgacha to'liq kafolat beramiz.
      </p>

      <div className="cards">
        {categories.map((cat, idx) => (
          <div key={idx} className="c">
            <div className="n">{cat.n}</div>
            <div className="ico">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>{cat.title}</h3>
            <p>{cat.desc}</p>
          </div>
        ))}
      </div>

      <div className="extra">
        <h3>Boshqa turdagi maxsus buyurtmalar:</h3>
        <p>
          Tablichkalar, navigatsiya ko'rsatkichlari, korporativ suvenirlar, brendlangan kiyimlar (polo, xudi, kepka), va fasad alyukabond qoplamalari.
        </p>
        <div className="pills">
          <span className="pill">Fasad Alyukabond</span>
          <span className="pill">Ofis Navigatsiyasi</span>
          <span className="pill">Brend kiyimlar</span>
          <span className="pill">Termos & Krujkalar</span>
          <span className="pill">Bayroqlar & Parus</span>
        </div>
      </div>
    </section>
  );
}
