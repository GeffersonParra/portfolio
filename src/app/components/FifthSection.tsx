"use client";

import { useTranslations } from "next-intl";
import { IoIosSend } from "react-icons/io";
import { toast } from "sonner";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function FifthSection() {
  const t = useTranslations("Texts");
  const captchaRef = useRef<HCaptcha>(null);
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const check = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    
    const checkResult = await check.json();
    
    if (checkResult.success) {
      formData.delete("h-captcha-response");
      formData.delete("g-recaptcha-response");
      formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      
      const finalResult = await response.json();
      
      if (finalResult.success) {
        toast.success(t("successMessage"));
        form.reset();
        captchaRef.current?.resetCaptcha();
      } else {
        toast.error(t("errorMessage"));
      }
    } else {
      toast.error(checkResult.message || t("catchMessage"));
    }
  };

  return (
    <section
      className="w-full flex flex-col items-center px-6 md:px-12 lg:px-24 xl:px-36 font-family-lack transition-colors duration-300 mb-24"
      id="contact"
    >
      <p className="w-full text-center font-family-lack-line text-4xl md:text-5xl lg:text-6xl mb-12">
        {t("contactMeTitle")}
      </p>
      <div className="flex flex-col lg:flex-row w-full gap-12 lg:gap-0 relative">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-8 md:gap-12 order-2 lg:order-1">
          <div
            className="border-static flex flex-col h-fit w-full sm:w-10/12 lg:w-8/12 relative p-8 md:p-12 text-3xl gap-2 bg-primary"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <p className="text-2xl md:text-3xl">{t("questionsTitle")}</p>
            <p className="text-lg md:text-xl">{t("alwaysAvailableAt")}</p>
            <div
              className="hidden sm:block border-marching [--custom-speed:0.5s] h-32 w-12 top-10 -right-4 -z-10 absolute"
              style={{ "--border-color": "var(--accent-primary)" } as any}
            ></div>
          </div>
          <div
            className="border-static flex flex-col h-fit w-full sm:w-10/12 lg:w-8/12 relative p-8 md:p-12 text-3xl gap-2 bg-primary"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <p className="text-2xl md:text-3xl">{t("currentLocation")}</p>
            <p className="text-lg md:text-xl">Bogotá D.C, Colombia</p>
            
            <div
              className="hidden sm:block border-marching [--custom-speed:1.5s] h-24 w-24 bottom-4 right-10 -z-10 absolute"
              style={{ "--border-color": "var(--accent-secondary)" } as any}
            ></div>
            <div
              className="hidden sm:block border-marching [--custom-speed:1s] h-20 w-20 -top-4 -left-4 -z-10 absolute"
              style={{ "--border-color": "var(--accent-thirdary)" } as any}
            ></div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-5 w-full max-w-2xl mx-auto"
          >
            <input type="checkbox" name="botcheck" className="hidden" />
            
            <input
              type="text"
              name="name"
              required
              className="border-static-bolder w-full h-12 pl-4 focus:outline-none"
              style={{ backgroundColor: "var(--bg-primary)" }}
              placeholder={`${t("yourName")}`}
            />
            <input
              type="email"
              name="email"
              required
              className="border-static-bolder w-full h-12 pl-4 focus:outline-none"
              style={{ backgroundColor: "var(--bg-primary)" }}
              placeholder={`${t("yourEmail")}`}
            />
            <input
              type="text"
              name="subject"
              required
              className="border-static-bolder w-full h-12 pl-4 focus:outline-none"
              style={{ backgroundColor: "var(--bg-primary)" }}
              placeholder={`${t("yourSubject")}`}
            />
            <textarea
              name="message"
              required
              className="border-static-bolder w-full min-h-[150px] pl-4 pt-3 focus:outline-none"
              style={{ backgroundColor: "var(--bg-primary)" }}
              placeholder={`${t("yourMessage")}`}
            ></textarea>
            <div className="w-full overflow-hidden flex justify-center lg:justify-start">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                ref={captchaRef}
                theme={theme === "dark" ? "dark" : "light"}
              />
            </div>
            <div className="relative mt-2 w-full sm:w-auto">
              <button
                type="submit"
                className="relative z-20 btn-primary flex text-xl md:text-2xl justify-center gap-2 items-center w-full sm:w-64 px-6 h-14 text-white transition-transform active:scale-95"
              >
                <IoIosSend className="text-3xl md:text-4xl shrink-0" />
                {t("herobtn1")}
              </button>
              <div
                className="absolute z-10 w-full sm:w-64 h-14 border-static top-0 hidden sm:block"
                style={{ "--custom-border-color": "var(--accent-primary)" } as any}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}