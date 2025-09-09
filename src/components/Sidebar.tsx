"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DynamicIcon } from "lucide-react/dynamic";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

useEffect(() => {
  const handleScroll = () => {
    const sections = ["home", "about", "gallery", "contact"];
    let found = false;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const offset = window.innerHeight / 2;

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(`#${section}`);
          found = true;
          break;
        }
      }
    }

    if (!found) setActiveSection("#home");
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const links = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT US", href: "#about" },
    { name: "GALLERY", href: "#gallery" },
    { name: "CONTACT US", href: "#contact" },
  ];

  return (
    <>
      {!open && (
        <button
          className="lg:hidden fixed top-4 left-2 z-50 p-2 text-black rounded-md"
          onClick={() => setOpen(true)}
        >
          <Menu size={34} />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-screen bg-[#E6E6E6] flex flex-col items-center justify-between py-6 z-40 
          transform transition-transform duration-300 
          ${open ? "translate-x-0 w-56" : "-translate-x-full w-56"} 
          lg:translate-x-0 lg:w-16`}
      >
        <div className="flex flex-col items-center">
          <Image
            src="/blink-logo-2.webp"
            alt="Logo"
            width={30}
            height={30}
            className="mb-6 xl:mb-10"
          />

          <nav className="flex flex-col items-center font-semibold">

            {/* Desktop links */}
            <div className="hidden lg:flex flex-col items-center gap-16 xl:gap-20 text-[.7rem] xl:text-[1rem] tracking-wide">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveSection(link.href)}
                  className={`relative rotate-[-90deg] whitespace-nowrap font-semibold transition-all duration-300 ease-out group ${
                    activeSection === link.href ? "text-[#404041]" : "text-red-600"
                  }`}
                >
                  {link.name}
                  <span
                    className="absolute left-1/2 bottom-[-6px] h-[2px] w-0 
                      bg-red-600 transition-all duration-300 ease-out
                      group-hover:w-full group-hover:-translate-x-1/2"
                  ></span>
                  <span
                    className="absolute inset-0 -z-10 scale-x-0 origin-left bg-red-100 
                      transition-transform duration-300 ease-out
                      group-hover:scale-x-100"
                  ></span>
                </Link>
              ))}
            </div>

            {/* Mobile/Tablet links */}
            <div className="flex flex-col gap-6 text-base lg:hidden">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${
                    activeSection === link.href ? "text-[#404041]" : "text-red-600"
                  }`}
                  onClick={() => {
                    setActiveSection(link.href);
                    setOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

          </nav>
        </div>

        <div className="flex flex-col items-center space-y-3 mt-auto mb-0">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full bg-gray-700 text-white hover:bg-gray-900 transition"
          >
            <DynamicIcon name="instagram" size={15} color="white" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full bg-gray-700 font-thin text-white hover:bg-gray-900 transition"
          >
            <DynamicIcon name="facebook" size={15} color="white" />
          </a>
        </div>
      </div>
    </>
  );
}
