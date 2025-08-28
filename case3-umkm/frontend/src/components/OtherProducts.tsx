import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { Utensils, Package, Shirt, Gift } from "lucide-react";

const otherProducts = [
  {
    title: "CATERING",
    description:
      "Kami bisa membawa Techa dalam acara kantor atau selebrasi pribadi kamu.",
    icon: Utensils,
  },
  {
    title: "COFFEE PACK",
    description:
      "Bawa pulang daun teh berkualitas yang sama dengan yang kami sajikan di kedai.",
    icon: Package,
  },
  {
    title: "MERCHANDISE",
    description:
      "Berbagai pilihan merchandise untuk menunjukkan kecintaan kamu ke dunia teh.",
    icon: Shirt,
  },
  {
    title: "HAMPERS",
    description:
      "Kirimkan satu kotak berisi daun teh, serta satu mug teh untuk orang spesial kamu.",
    icon: Gift,
  },
];

const OtherProducts = () => {
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
    <Element name="products">
      <section ref={sectionRef} className="max-w-5xl mx-auto py-12 mb-32">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-2 leading-tight">
            Bawa Kami dalam Keseharian Kamu
          </h2>
          <p className="text-emerald-500 font-semibold text-sm uppercase tracking-wider mb-4">
            Kami lebih dari sekedar kedai teh
          </p>
          <div className="w-16 h-1 bg-emerald-900 mx-auto"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {otherProducts.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <div
                key={index}
                className={cn(
                  "text-center transition-all duration-1000 ease-out",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: `${200 + index * 150}ms`,
                }}
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 flex items-center justify-center bg-emerald-100 rounded-full">
                    <IconComponent
                      size={48}
                      className="text-emerald-500 stroke-[1.5]"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-wide">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </Element>
  );
};

export default OtherProducts;
