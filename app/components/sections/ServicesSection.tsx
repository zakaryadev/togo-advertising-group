"use client";
import { useLang } from "../../content/i18n-context";

const services = [
  { n: "01", tKey: "s1", tags: ["s1.a", "s1.b", "s1.c"] },
  { n: "02", tKey: "s2", tags: ["s2.a", "s2.b", "s2.c"] },
  { n: "03", tKey: "s3", tags: ["s3.a", "s3.b", "s3.c"] },
  { n: "04", tKey: "s4", tags: ["s4.a", "s4.b", "s4.c"] },
  { n: "05", tKey: "s5", tags: ["s5.a", "s5.b", "s5.c"] },
  { n: "06", tKey: "s6", tags: ["s6.a", "s6.b", "s6.c"] },
];

export default function ServicesSection() {
  const { t } = useLang();

  return (
    <section className="sec" id="xizmat">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="tag mono">{t("svc.tag")}</span>
            <h2>{t("svc.h")}</h2>
          </div>
          <p>{t("svc.p")}</p>
        </div>
        <div className="rows">
          {services.map(svc => (
            <a className="row rv" key={svc.n}>
              <span className="fill" />
              <div className="row-in">
                <span className="n">{svc.n}</span>
                <h3>{t(`${svc.tKey}.t`)}</h3>
                <div className="tags-wrap">
                  <p>{t(`${svc.tKey}.d`)}</p>
                  <div className="tags">
                    {svc.tags.map(tag => (
                      <span key={tag}>{t(tag)}</span>
                    ))}
                  </div>
                </div>
                <span className="prc">
                  <u>{t("from")}</u>
                  <span>{t(`${svc.tKey}.p`)}</span>
                </span>
                <span className="ar">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
