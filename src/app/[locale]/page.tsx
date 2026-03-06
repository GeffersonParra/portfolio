"use client";
import Header from "../components/Header";
import FirstSection from "../components/FirstSection";
import SecondSection from "../components/SecondSection";
import ThirdSection from "../components/ThirdSection";
import FourthSection from "../components/FourthSection";
import FifthSection from "../components/FifthSection";
import BackgroundCanvas from "../components/BackgroundCanvas";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react"; // Añadimos useEffect
import { Toaster } from "sonner";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const locale = useLocale() as "es" | "en";

  // Lógica de Intersection Observer directamente aquí o vía Hook externo
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Ajuste para que cambie la URL cuando la sección esté centrada
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            // Reemplaza la URL sin añadir una nueva entrada al historial (UX limpia)
            window.history.replaceState(null, "", `#${id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modal de Imagen */}
      {selectedImage && (
        <div 
          className="z-[100] bg-black/80 fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt="Imágen" className="object-contain max-h-[80vh] block mx-auto border border-white/10 shadow-2xl"/>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-6 md:p-8 text-center">
              <p className="text-sm md:text-base font-medium">
                {selectedImage.description[locale]} 
              </p>
            </div>
          </div>
        </div>
      )}

      <Toaster position="bottom-right" />
      
      <BackgroundCanvas>
        <Header />
        {/* Asegúrate de que cada sección tenga su ID correspondiente */}
        <FirstSection />
        <SecondSection />
        <ThirdSection setSelectedImage={setSelectedImage} />
        <FourthSection />
        <FifthSection />
      </BackgroundCanvas>
    </div>
  );
}