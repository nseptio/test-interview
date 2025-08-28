import aboutImage from "@/assets/pouring-tea.jpg";
import teaImage from "@/assets/tea-leaf.jpg";
import teapotImage from "@/assets/teapot.jpg";
import teaCupImage from "@/assets/teacup.jpg";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";

const filosofiItems = [
  {
    title: "Daun Teh Pilihan",
    description:
      "Kami hanya menggunakan daun teh single-origin dari perkebunan terbaik di Uji, Kyoto. Setiap helai daun dipetik pada waktu yang tepat untuk menjamin kualitas rasa dan aroma yang maksimal.",
    imageUrl: teaImage,
  },
  {
    title: "Peralatan Otentik",
    description:
      "Pengalaman otentik lahir dari alat yang tepat. Kami menggunakan mangkuk keramik (chawan) dan pengaduk bambu (chasen) buatan tangan untuk menciptakan rasa dan pengalaman yang sesungguhnya.",
    imageUrl: teapotImage,
  },
  {
    title: "Air dengan Suhu Sempurna",
    description:
      "Setiap jenis teh memiliki karakternya sendiri. Barista kami terlatih untuk menggunakan air dengan suhu yang presisi, memastikan setiap seduhan dapat mengeluarkan profil rasa terbaiknya tanpa menjadi pahit.",
    imageUrl: teaCupImage,
  },
];

function AboutUs() {
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
    <Element name="about">
      <section ref={sectionRef} className="max-w-5xl mx-auto py-12 mb-32">
        <h2
          className={cn(
            "text-6xl font-bold text-emerald-800 mb-16 transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Tentang Kami
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <div
            className={cn(
              "relative w-full md:w-1/2 overflow-hidden rounded-2xl transition-all duration-1000 ease-out delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <img
              src={aboutImage}
              alt="Our Story"
              className="w-full h-auto object-cover [mask-image:linear-gradient(to_right,black_50%,transparent)] [mask-repeat:no-repeat] [mask-size:100%]"
            />
          </div>
          <div
            className={cn(
              "md:w-1/2 space-y-4 transition-all duration-1000 ease-out delay-400",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="leading-loose">
                <strong>Techa</strong> berdiri pada tahun 2018 dari sebuah
                kecintaan mendalam terhadap seni dan filosofi di balik upacara
                minum teh Jepang. Kami percaya bahwa secangkir teh bukan hanya
                sekadar minuman, tetapi sebuah ritual untuk menenangkan pikiran
                dan menghubungkan diri dengan momen saat ini.
              </p>
              <p className="leading-loose">
                Misi kami sederhana, yaitu menyajikan teh Jepang berkualitas
                dengan cara yang jujur dan otentik. Setiap sudut Techa dirancang
                untuk menjadi tempat Anda melambat, berdialog, atau sekadar
                menikmati waktu sendiri. Kami mengundang Anda untuk duduk
                sejenak, memilih teh, dan merasakan sendiri ketenangan yang kami
                tawarkan dalam setiap cangkir.
              </p>
            </div>
          </div>
        </div>

        <h3
          className={cn(
            "text-2xl font-semibold text-emerald-800 text-end mb-16 transition-all duration-1000 ease-out delay-600",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          "Lebih dari sekadar minuman, ini adalah ritual."
        </h3>

        {/* Z-Pattern Layout */}
        <div className="space-y-24">
          {filosofiItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center gap-12 transition-all duration-1000 ease-out",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDelay: `${1000 + index * 600}ms`,
              }}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-emerald-600"></div>
                  <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">
                    Filosofi {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h4 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {item.title}
                </h4>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative element */}
                <div className="flex items-center gap-2 pt-4">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <div className="w-4 h-0.5 bg-emerald-600/50"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Element>
  );
}
export default AboutUs;
