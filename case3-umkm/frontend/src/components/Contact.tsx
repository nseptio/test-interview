import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { Instagram, Facebook, Twitter } from "lucide-react";

const contactMethods = [
  {
    platform: "INSTAGRAM",
    handle: "@techa_id",
    icon: Instagram,
    color: "text-emerald-500",
  },
  {
    platform: "FACEBOOK",
    handle: "Techa Indonesia",
    icon: Facebook,
    color: "text-emerald-500",
  },
  {
    platform: "X (TWITTER)",
    handle: "@techa_id",
    icon: Twitter,
    color: "text-emerald-500",
  },
];

const Contact = () => {
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
    <Element name="contact">
      <section ref={sectionRef} className="bg-emerald-400">
        {/* Header Section */}
        <div
          className={cn(
            "text-center py-16 transition-all duration-1000 ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase">
            contact us
          </h2>
          <div className="w-16 h-1 bg-white mx-auto"></div>
        </div>

        {/* Contact Methods */}
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-0">
            {contactMethods.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "text-center transition-all duration-1000 ease-out",
                    isVisible ? "opacity-100" : "opacity-0",
                    // Add border separator except for last item
                    index < contactMethods.length - 1
                      ? "lg:border-r lg:border-white/30"
                      : ""
                  )}
                  style={{
                    transitionDelay: `${200 + index * 150}ms`,
                  }}
                >
                  <div className="lg:px-8">
                    <a
                      href="#"
                      className="block hover:scale-105 transition-transform duration-300 cursor-pointer group"
                    >
                      {/* Icon */}
                      <div className="mb-6 flex justify-center">
                        <IconComponent
                          size={48}
                          className="text-white stroke-[1.5] group-hover:text-white/80 transition-colors duration-300"
                        />
                      </div>

                      {/* Platform Name */}
                      <h3 className="text-white/80 font-medium text-sm uppercase tracking-wider mb-2 group-hover:text-white transition-colors duration-300">
                        {contact.platform}
                      </h3>

                      {/* Handle/Contact Info */}
                      <p className="text-white font-semibold text-lg group-hover:text-white/90 transition-colors duration-300">
                        {contact.handle}
                      </p>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className={cn(
            "text-center pb-8 transition-all duration-1000 ease-out delay-800",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
