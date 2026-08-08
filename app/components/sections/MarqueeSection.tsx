"use client";
import { useLang } from "../../content/i18n-context";

export default function MarqueeSection() {
  const { ta } = useLang();
  const items = ta("marq");
  const html = items.map(i => `<span>${i}</span><em>/</em>`).join("");
  const doubled = html + html;

  return (
    <>
      <div className="hazard" />
      <div className="marqs" aria-hidden="true">
        <div className="mrow a" dangerouslySetInnerHTML={{ __html: doubled }} />
        <div className="mrow b" dangerouslySetInnerHTML={{ __html: doubled }} />
      </div>
    </>
  );
}
