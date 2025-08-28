import { Button } from "@/components/ui/button";
import { Element, Link } from "react-scroll";
import heroImage from "@/assets/hero.jpg";

export default function Hero() {
  return (
    <Element name="hero">
      <section
        id="hero"
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Gradient overlay - darker on top, lighter on bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/20"></div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl text-center">
            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Ketenangan dalam
              <span className="block text-emerald-300 mt-4 text-4xl md:text-6xl lg:text-7xl">
                Setiap Seduhan
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Kami menyajikan pengalaman minum teh Jepang yang otentik dengan
              daun teh pilihan yang didatangkan langsung dari perkebunan terbaik
              di Uji dan Shizuoka.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="menu" smooth={true} duration={500} offset={-80}>
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform cursor-pointer"
                >
                  Lihat Menu
                </Button>
              </Link>
              <Link to="about" smooth={true} duration={500} offset={-80}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-emerald-900 px-10 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300 transform cursor-pointer"
                >
                  Cerita Techa
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </section>
    </Element>
  );
}
