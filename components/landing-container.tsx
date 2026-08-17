"use client";

import { useEffect } from "react";
import { cleanJsCode, rawHtml } from "./landing-template";
import { portfolioImageSourcesByCategory } from "./portfolio-images";

declare global {
  interface Window {
    __togoPortfolioImages?: Record<string, readonly string[]>;
    __togoRenderPortfolio?: () => void;
  }
}

const legacyPhotoMapPattern = /const PHOTOS = \{[\s\S]*?\n\};/;

const landingScript = cleanJsCode
  .replace(
    legacyPhotoMapPattern,
    "const PHOTOS = window.__togoPortfolioImages || {};",
  )
  .replace(
    "fillPhotos();",
    "fillPhotos();\nwindow.__togoRenderPortfolio = fillPhotos;",
  );

export default function LandingContainer() {
  useEffect(() => {
    window.__togoPortfolioImages = portfolioImageSourcesByCategory;

    const scriptEl = document.createElement("script");
    scriptEl.textContent =
      "(function(){if(window.__togoLandingInit)return;window.__togoLandingInit=true;" +
      landingScript +
      "})();";
    document.body.appendChild(scriptEl);
    window.__togoRenderPortfolio?.();

    return () => {
      if (document.body.contains(scriptEl)) {
        document.body.removeChild(scriptEl);
      }
    };
  }, []);

  return (
    <div
      className="raw-html-container"
      dangerouslySetInnerHTML={{ __html: rawHtml }}
      style={{ width: "100%", minHeight: "100vh" }}
    />
  );
}
