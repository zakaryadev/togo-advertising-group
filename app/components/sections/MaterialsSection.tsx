"use client";
import { useEffect, useState } from "react";
import { useLang } from "../../content/i18n-context";

interface MaterialItem {
  key: string;
  name_uz?: string;
  price_per_sqm: number;
  is_active?: boolean;
}

const defaultRows = [
  { key: "m1", a: "r1a", b: "r1b", c: "r1c", defaultPrice: 45000 },
  { key: "m2", a: "r2a", b: "r2b", c: "r2c", defaultPrice: 55000 },
  { key: "m3", a: "r3a", b: "r3b", c: "r3c", defaultPrice: 65000 },
  { key: "m4", a: "r4a", b: "r4b", c: "r4c", defaultPrice: 70000 },
  { key: "m5", a: "r5a", b: "r5b", c: "r5c", defaultPrice: 95000 },
  { key: "m6", a: "r6a", b: "r6b", c: "r6c", priceKey: "req" },
];

export default function MaterialsSection() {
  const { t } = useLang();
  const [materialPrices, setMaterialPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/materials")
      .then((res) => res.json())
      .then((data) => {
        if (data.materials && Array.isArray(data.materials)) {
          const pricesMap: Record<string, number> = {};
          data.materials.forEach((m: MaterialItem) => {
            if (m.key && m.price_per_sqm !== undefined) {
              pricesMap[m.key] = Number(m.price_per_sqm);
            }
          });
          setMaterialPrices(pricesMap);
        }
      })
      .catch(() => {});
  }, []);

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
              {defaultRows.map((row, i) => {
                const currentPrice = materialPrices[row.key] ?? row.defaultPrice;
                const formattedPrice = currentPrice
                  ? currentPrice.toLocaleString("ru-RU")
                  : undefined;

                return (
                  <tr key={i}>
                    <td>{t(row.a)}</td>
                    <td>{t(row.b)}</td>
                    <td>{t(row.c)}</td>
                    <td className="p">
                      {row.priceKey ? t(row.priceKey) : formattedPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
