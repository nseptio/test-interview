import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import tea from "@/assets/tea.jpg";
import teaLatte from "@/assets/tea-latte.jpg";
import mochi from "@/assets/mochi.jpg";

const menuCategories = [
  {
    title: "Teh Murni",
    description:
      "Nikmati rasa otentik dari daun teh hijau Jepang berkualitas tinggi, diseduh dengan metode tradisional untuk mengeluarkan karakter terbaiknya.",
    imageUrl: tea,
    alt: "Secangkir teh beserta pot tradisional",
  },
  {
    title: "Teh Latte",
    description:
      "Perpaduan harmonis antara teh premium kami dengan kelembutan susu segar, menciptakan minuman yang creamy dan memanjakan.",
    imageUrl: teaLatte,
    alt: "Segelas Matcha Latte",
  },
  {
    title: "Pendamping",
    description:
      "Camilan manis khas Jepang yang kami buat setiap hari untuk menjadi teman sempurna secangkir teh Anda.",
    imageUrl: mochi,
    alt: "Sepiring Mochi dengan teh",
  },
];

const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px",
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  return (
    <Element name="menu">
      <section ref={sectionRef} className="bg-emerald-50 pb-12 mb-24">
        <div className="max-w-5xl mx-auto py-12">
          <div
            className={cn(
              "text-center mb-16 transition-all duration-1000 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-6xl font-bold text-emerald-800 mb-4">
              Menu Kami
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
              Temukan koleksi teh dan camilan autentik Jepang yang dibuat dengan
              penuh perhatian dan cinta
            </p>
            <div className="w-32 h-1 bg-emerald-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuCategories.map((category, index) => (
              <Card
                key={index}
                className={cn(
                  "group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-1000 ease-out transform hover:-translate-y-2",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: `${200 + index * 200}ms`,
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category number overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-0.5 bg-emerald-600"></div>
                    <span className="text-emerald-600 font-medium text-xs uppercase tracking-wider">
                      Kategori
                    </span>
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Menu;
