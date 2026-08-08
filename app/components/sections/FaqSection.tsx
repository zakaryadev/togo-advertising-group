"use client";
import { useState } from "react";
import { useLang } from "../../content/i18n-context";

const questions = ["q1", "q2", "q3", "q4", "q5"];

export default function FaqSection() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="sec" id="savol" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="tag mono">{t("faq.tag")}</span>
            <h2>{t("faq.h")}</h2>
          </div>
          <p>{t("faq.p")}</p>
        </div>
        <div className="faq rv">
          {questions.map((qKey, i) => (
            <div className={`qq${openIdx === i ? " on" : ""}`} key={qKey}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span>{t(qKey)}</span>
                <i>+</i>
              </button>
              <div className="ans">
                <p>{t(`a${i + 1}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
