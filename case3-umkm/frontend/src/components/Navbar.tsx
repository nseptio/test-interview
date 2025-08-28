import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-scroll";
import logo from "@/assets/favicon-32x32.png";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", to: "hero" },
  { name: "Tentang", to: "about" },
  { name: "Menu", to: "menu" },
  { name: "Produk", to: "products" },
  { name: "Kontak", to: "contact" },
];

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height
      const heroSection = document.querySelector("#hero");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsSticky(heroBottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isSticky ? "bg-white shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src={logo} alt="Techa Logo" className="w-8 h-8" />
            <span
              className={cn(
                "text-xl font-bold transition-colors duration-300",
                isSticky ? "text-emerald-700" : "text-white"
              )}
            >
              Techa
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                activeClass={
                  isSticky
                    ? "!text-emerald-700 !bg-emerald-50"
                    : "!text-white !bg-white/20"
                }
                className={cn(
                  "px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer font-medium",
                  isSticky
                    ? "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
                    : "text-white/90 hover:text-white hover:bg-white/20"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="contact-section"
              smooth={true}
              duration={500}
              offset={-80}
            >
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Hubungi Kami
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "transition-colors duration-300",
                isSticky
                  ? "text-gray-600 hover:text-emerald-700"
                  : "text-white/90 hover:text-white"
              )}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
