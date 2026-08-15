"use client";

import { useState } from "react";
import Image from "next/image";

export default function Portfolio() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      cat: "kran",
      title: "Minorali Kranga Banner O'rnatish",
      desc: "Balandlikdagi alpinistlar montaji va shamol yukiga hisob kitob qilingan setka reklama.",
      tags: ["Kran", "Banner Setka", "Alpinist Montaj"],
      img: "/logos.png",
    },
    {
      id: 2,
      cat: "harf",
      title: "Akril Bortli Yorug'lik Harflari",
      desc: "Tungi va kunduzgi rejimda yuqori yorqinlikka ega bo'lgan 3D obyomli harflar.",
      tags: ["Obyomli Harf", "Akril", "LED Peshtoq"],
      img: "/logos.png",
    },
    {
      id: 3,
      cat: "bosma",
      title: "Katta Formatli Banner & Orakal",
      desc: "1440 dpi sifatdagi bosma va bino fasadiga montaj qilish xizmati.",
      tags: ["Banner", "Orakal", "1440 dpi"],
      img: "/logos.png",
    },
    {
      id: 4,
      cat: "stend",
      title: "CAEx Expo Ko'rgazma Stendi",
      desc: "Xalqaro ko'rgazma uchun individual loyihalashtirilgan mobil stend va press-wall.",
      tags: ["Stend", "CAEx", "Press-Wall"],
      img: "/logos.png",
    },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <section className="wrap" id="portfolio">
      <div className="kick">BIZNING ISHLARIMIZ</div>
      <h2>Bajarilgan loyihalar galereyasi</h2>
      <p className="slead">
        Har bir loyiha uchun o'lchov olishdan boshlab obyektga o'rnatishgacha bo'lgan jarayonlarni fotosuratlarda ko'rishingiz mumkin.
      </p>

      <div className="topbar" style={{ marginTop: "24px" }}>
        <div className="pfnav">
          <button
            className={`pfchip ${filter === "all" ? "on" : ""}`}
            onClick={() => setFilter("all")}
          >
            Barchasi
          </button>
          <button
            className={`pfchip ${filter === "kran" ? "on" : ""}`}
            onClick={() => setFilter("kran")}
          >
            Kran reklamasi
          </button>
          <button
            className={`pfchip ${filter === "harf" ? "on" : ""}`}
            onClick={() => setFilter("harf")}
          >
            Obyomli harflar
          </button>
          <button
            className={`pfchip ${filter === "bosma" ? "on" : ""}`}
            onClick={() => setFilter("bosma")}
          >
            Bosma & Banner
          </button>
          <button
            className={`pfchip ${filter === "stend" ? "on" : ""}`}
            onClick={() => setFilter("stend")}
          >
            Ko'rgazma stendlari
          </button>
        </div>
      </div>

      <div className="pf">
        {filteredProjects.map((p) => (
          <div key={p.id} className="pfb">
            <div className="pfh">
              <div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="chips">
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="shots">
              <div className="shot wm">
                <Image
                  src={p.img}
                  alt={p.title}
                  width={600}
                  height={450}
                  style={{ objectFit: "cover" }}
                />
                <span className="stamp">TOGO GROUP</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
