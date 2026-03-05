"use client";

import { useTranslations } from "next-intl";
import { IoIosSend } from "react-icons/io";
import { toast } from "sonner";

export default function FifthSection() {
  const t = useTranslations("Texts");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const toastId = toast.loading(t("sending") || "Enviando..."); 
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        toast.success(t("successMessage"), { id: toastId });
        (event.target as HTMLFormElement).reset();
      } else {
        toast.error(t("errorMessage"), { id: toastId });
      }
    } catch (error) {
      toast.error(t("catchMessage"), { id: toastId });
    }
  }

  return (
    <section className="w-full flex flex-col items-center px-36 font-family-lack transition-colors duration-300 mb-24" id="contact">
      <p className="w-full text-center font-family-lack-line text-6xl mb-12">
        {t("contactMeTitle")}
      </p>
      <div className="flex w-full relative">
        <div className="w-1/2 h-full my-auto flex flex-col align-middle justify-center items-center gap-12">
          <div
            className="border-static flex flex-col h-fit w-8/12 col-span-8 relative p-12 text-3xl gap-2 my-auto mx-auto"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <p className="text-3xl">{t("questionsTitle")}</p>
            <p className="text-xl">{t("alwaysAvailableAt")}</p>
            <div
              className="border-marching [--custom-speed:0.5s] h-36 w-16 top-18 -right-6 -z-5 absolute"
              style={{ "--border-color": "var(--accent-primary)" } as any}
            ></div>
          </div>
          <div
            className="border-static flex flex-col h-fit w-8/12 col-span-8 relative p-12 text-3xl gap-2 my-auto mx-auto"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <p className="text-3xl">{t("currentLocation")}</p>
            <p className="text-xl">Bogotá D.C, Colombia</p>
            <div
              className="border-marching [--custom-speed:1.5s] h-36 w-36 top-10 right-24 -z-5 absolute"
              style={{ "--border-color": "var(--accent-secondary)" } as any}
            ></div>
            <div
              className="border-marching [--custom-speed:1s] h-36 w-24 -top-6 -left-6 -z-5 absolute"
              style={{ "--border-color": "var(--accent-thirdary)" } as any}
            ></div>
          </div>
        </div>

        <div className="w-1/2 h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-6 w-full"
          >
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
            <input
              type="text"
              name="name"
              required
              className="border-static-bolder w-full h-10 pl-2"
              style={{ backgroundColor: "var(--bg-primary)"}}
              placeholder={`${t("yourName")}`}
            />
            <input
              type="email"
              name="email"
              required
              className="border-static-bolder w-full h-10 pl-2 bg-transparent"
              style={{ backgroundColor: "var(--bg-primary)"}}
              placeholder={`${t("yourEmail")}`}
            />
            <input
              type="text"
              name="subject"
              required
              className="border-static-bolder w-full h-10 pl-2 bg-transparent"
              style={{ backgroundColor: "var(--bg-primary)"}}
              placeholder={`${t("yourSubject")}`}
            />
            <textarea
              name="message"
              required
              className="border-static-bolder w-full min-h-32 pl-2 pt-2 bg-transparent"
              style={{ backgroundColor: "var(--bg-primary)"}}
              placeholder={`${t("yourMessage")}`}
            ></textarea>

            <div className="relative">
              <button 
                type="submit" 
                className="relative z-20 btn-primary flex text-2xl justify-center gap-2 items-center w-64 px-6 h-14 text-white"
              >
                <IoIosSend className="text-4xl shrink-0" />
                {t("herobtn1")}
              </button>
              <div
                className="absolute z-10 w-64 h-14 border-static top-0"
                style={
                  { "--custom-border-color": "var(--accent-primary)" } as any
                }
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}