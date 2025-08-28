import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Element } from "react-scroll";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface EmailMe {
  className?: string;
}

const toastSuccess = () =>
  toast.success("Pesan berhasil terkirim!", {
    duration: 4000,
  });

const toastError = () =>
  toast.error("Gagal untuk mengirim pesan. Silakan coba lagi.", {
    duration: 4000,
  });

const EmailMe: React.FC<EmailMe> = ({ className = "" }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const turnstileRef = React.useRef<TurnstileInstance>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Please confirm you are human.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }
    if (formData.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.currentTarget as HTMLFormElement,
        import.meta.env.VITE_PUBLIC_ID
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setFormData({ name: "", email: "", message: "" }); // Reset form
          turnstileRef.current?.reset();
          toastSuccess();
          setCaptchaToken(""); // Reset captcha token
        },
        (error) => {
          console.error("Error sending email:", error.text);
          toastError();
          turnstileRef.current?.reset();
          setCaptchaToken(""); // Reset captcha token on error
        }
      );
  };

  return (
    <Element
      name="contact-section"
      className={`py-12 sm:py-20 bg-emerald-50 ${className}`}
    >
      <Toaster />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Kirim kami pesan, apapun itu!
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Punya pertanyaan atau pesanan? atau mungkin hanya ingin menyapa?
            Silakan.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium text-gray-500 mb-2"
              >
                Nama Kamu
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama kamu"
                required
                className="w-full px-0 py-2 sm:py-3 text-base sm:text-lg bg-transparent border-0 border-b-2 border-gray-300 focus:border-cold-1 focus:ring-0 focus:outline-none transition-colors duration-300 placeholder-gray-400"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-500 mb-2"
              >
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan alamat email kamu"
                required
                className="w-full px-0 py-2 sm:py-3 text-base sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:border-cold-1 focus:ring-0 focus:outline-none transition-colors duration-300 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs sm:text-sm font-medium text-gray-500 mb-2"
            >
              Pesan Kamu
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tulis pesan kamu di sini..."
              required
              rows={4}
              className="w-full px-0 py-2 sm:py-3 text-base sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:border-cold-1 focus:ring-0 focus:outline-none transition-colors duration-300 placeholder-gray-400 resize-none"
            />
          </div>

          {/* Captcha */}
          <div>
            <Turnstile
              ref={turnstileRef}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onExpire={() => {
                toast.error("Captcha expired. Please try again.");
                setCaptchaToken("");
              }}
              onError={() => {
                toast.error("Captcha error. Please try again.");
                setCaptchaToken("");
              }}
              onSuccess={() => setCaptchaToken("success")}
            ></Turnstile>
          </div>

          {/* Submit Button */}
          <div className="pt-6 sm:pt-8">
            <Button
              type="submit"
              size="lg"
              className="py-8 px-12 group relative bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 uppercase tracking-wide flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-base w-full sm:w-auto justify-center"
            >
              <span>kirim</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </form>
      </div>
    </Element>
  );
};

export default EmailMe;
