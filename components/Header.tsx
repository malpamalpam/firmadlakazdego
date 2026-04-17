"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ofertaOpen, setOfertaOpen] = useState(false);
  const [uslugiOpen, setUslugiOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const isLight = transparent && !scrolled && !menuOpen;

  return (
    <header className={`${transparent ? "fixed" : "sticky top-0"} w-full z-50 navbar-hero ${scrolled || !transparent ? "bg-white shadow-md" : ""}`}>
      <nav className="container mx-auto flex items-center justify-between px-5 py-3">
        <Link href="/" className="flex-shrink-0">
          <img
            src={isLight ? "/img/logo-white.png" : "/img/logo-dark.png"}
            alt="Firma dla Kazdego - logo"
            width={130}
            height={53}
          />
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke={isLight ? "white" : "#32373c"} viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Nav */}
        <div className={`${menuOpen ? "block" : "hidden"} lg:flex lg:items-center lg:gap-1 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none p-4 lg:p-0`}>

          {/* Oferta dropdown */}
          <div className="relative" onMouseEnter={() => setOfertaOpen(true)} onMouseLeave={() => setOfertaOpen(false)}>
            <button className={`flex items-center gap-1 py-2 lg:py-0 px-2 text-sm font-medium ${isLight ? "text-white" : "text-gray-700"} hover:text-[var(--accent)] transition-colors`} onClick={() => setOfertaOpen(!ofertaOpen)}>
              Oferta
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {ofertaOpen && (
              <div className="lg:absolute top-full left-0 bg-white border rounded-lg shadow-lg py-2 min-w-[220px] z-50">
                {["Programisci / Graficy", "E-commerce", "Architekci", "Tlumacze / Lektorzy", "Muzycy", "Inne branze"].map((item) => (
                  <Link key={item} href="/oferta" className="block px-4 py-2 text-sm text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50" onClick={() => { setOfertaOpen(false); setMenuOpen(false); }}>
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Uslugi dropdown */}
          <div className="relative" onMouseEnter={() => setUslugiOpen(true)} onMouseLeave={() => setUslugiOpen(false)}>
            <button className={`flex items-center gap-1 py-2 lg:py-0 px-2 text-sm font-medium ${isLight ? "text-white" : "text-gray-700"} hover:text-[var(--accent)] transition-colors`} onClick={() => setUslugiOpen(!uslugiOpen)}>
              Uslugi
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {uslugiOpen && (
              <div className="lg:absolute top-full left-0 bg-white border rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                {["Biznesplany", "Program partnerski", "Inne"].map((item) => (
                  <Link key={item} href="/uslugi" className="block px-4 py-2 text-sm text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50" onClick={() => { setUslugiOpen(false); setMenuOpen(false); }}>
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct nav items */}
          {[
            { label: "Dla Pracodawcow", href: "/dla-pracodawcow" },
            { label: "Cudzoziemcy", href: "/dla-cudzoziemcow" },
            { label: "Konsultacje online", href: "/konsultacje" },
            { label: "Blog", href: "/blog" },
            { label: "O Nas", href: "/o-nas" },
            { label: "FAQ", href: "/#faq" },
            { label: "Kontakt", href: "/kontakt" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className={`block py-2 lg:py-0 px-2 text-sm font-medium ${isLight ? "text-white" : "text-gray-700"} hover:text-[var(--accent)] transition-colors`} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}

          {/* Language */}
          <div className="flex items-center gap-1 pt-2 lg:pt-0 border-t lg:border-0 mt-2 lg:mt-0 pl-2">
            <svg width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-full">
              <rect x="31.4453" y="25" width="37.8889" height="25" transform="rotate(-180 31.4453 25)" fill="white"/>
              <rect x="31.4453" y="25" width="37.8889" height="13.3333" transform="rotate(-180 31.4453 25)" fill="#CC0000"/>
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
}
