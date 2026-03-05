"use client";
import Header from "../components/Header";
import FirstSection from "../components/FirstSection";
import SecondSection from "../components/SecondSection";
import ThirdSection from "../components/ThirdSection";
import FourthSection from "../components/FourthSection";
import FifthSection from "../components/FifthSection";
import BackgroundCanvas from "../components/BackgroundCanvas";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Toaster } from "sonner";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const locale = useLocale() as "es" | "en";
  return (
    <div className="min-h-screen flex flex-col">
      {selectedImage && (
        <div className="z-10 bg-black/80 fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-full max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt="Imágen" className="object-contain max-h-[80vh] block mx-auto"/>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-8 text-center">
              <p className="text-sm md:text-base font-medium">
                {selectedImage.description[locale]} 
              </p>
            </div>
          </div>
        </div>
      )}
      <Toaster />
      <BackgroundCanvas>
        <Header />
        <FirstSection />
        <SecondSection />
        <ThirdSection setSelectedImage={setSelectedImage} />
        <FourthSection />
        <FifthSection />
      </BackgroundCanvas>
    </div>
  );
}
