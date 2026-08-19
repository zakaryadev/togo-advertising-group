"use client";

import { useState } from "react";

const partnerLogos = Array.from({ length: 46 }, (_, index) => ({
  x: `${(index % 23 / 22) * 100}%`,
  y: index < 23 ? "0%" : "100%",
}));

export default function PartnersMarquee({ label }: { label: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedLogo = selectedIndex === null ? null : partnerLogos[selectedIndex];

  return (
    <div className={`partners-interactive${selectedLogo ? " is-selected" : ""}`}>
      <div className="partners-marquee" aria-label={label}>
        <div className="partners-track">
          {[false, true].map((isDuplicate) => (
            <span className="partners-set" key={String(isDuplicate)} aria-hidden={isDuplicate || undefined}>
              {partnerLogos.map((logo, index) => (
                <button
                  className="partners-logo"
                  key={index}
                  type="button"
                  aria-label={`${label}: ${index + 1}-logoni kattalashtirish`}
                  tabIndex={isDuplicate ? -1 : undefined}
                  style={{ backgroundPosition: `${logo.x} ${logo.y}` }}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </span>
          ))}
        </div>
      </div>
      {selectedLogo && (
        <>
          <button
            className="partners-backdrop"
            type="button"
            aria-label="Logo ko‘rinishini yopish"
            onClick={() => setSelectedIndex(null)}
          />
          <button
            className="partners-preview"
            type="button"
            aria-label="Logo ko‘rinishini yopish"
            style={{ backgroundPosition: `${selectedLogo.x} ${selectedLogo.y}` }}
            onClick={() => setSelectedIndex(null)}
          />
        </>
      )}
    </div>
  );
}
