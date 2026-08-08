"use client";
import { useLang } from "../../content/i18n-context";

const rows = [
  { a: "r1a", b: "r1b", c: "r1c", price: "45 000" },
  { a: "r2a", b: "r2b", c: "r2c", price: "55 000" },
  { a: "r3a", b: "r3b", c: "r3c", price: "65 000" },
  { a: "r4a", b: "r4b", c: "r4c", price: "70 000" },
  { a: "r5a", b: "r5b", c: "r5c", price: "95 000" },
  { a: "r6a", b: "r6b", c: "r6c", priceKey: "req" },
];

export default function MaterialsSection() {
  const { t } = useLang();

  return (
    <section className="sec" id="material" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="tag mono">{t("mat.tag")}</span>
            <h2>{t("mat.h")}</h2>
          </div>
          <p>{t("mat.p")}</p>
        </div>
        <div className="tblwrap rv">
          <table className="tbl">
            <thead>
              <tr>
                <th>{t("th1")}</th>
                <th>{t("th2")}</th>
                <th>{t("th3")}</th>
                <th>{t("th4")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{t(row.a)}</td>
                  <td>{t(row.b)}</td>
                  <td>{t(row.c)}</td>
                  <td className="p">{row.priceKey ? t(row.priceKey) : row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
