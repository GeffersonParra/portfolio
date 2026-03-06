import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail, MdDownload } from "react-icons/md";
import { useTranslations } from "next-intl";
import { RotatingText } from "./RotatingText";
import Link from "next/link";

export default function FirstSection() {
  const t = useTranslations("Texts");
  const wordsArray = t('words').split(',');

  const handleDownload = () => {
    const fileUrl = `/documents/Gefferson_Ferney_Parra_Vargas.pdf`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "Gefferson_Ferney_Parra_Vargas.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className="w-full flex flex-col items-center px-6 md:px-12 lg:px-24 xl:px-36 py-20 md:py-36 font-family-lack min-h-screen transition-colors duration-300 mt-12 md:mt-0"
      style={{ color: 'var(--text-primary)' }}
      id="home"
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-36 h-full my-auto ">
        <div className="relative text-xl shrink-0 flex flex-col items-center lg:items-start">
          <div className="relative group">
            <img
              src="/images/me.png"
              alt="Gefferson Parra"
              className="w-56 h-56 md:w-72 md:h-72 transition-all duration-500 object-cover z-20 relative"
              style={{ filter: 'var(--photo-filter)' }}
            />
            <div className="w-56 h-56 md:w-72 md:h-72 absolute top-4 left-4 z-0 border-marching" />
          </div>
          <p className="text-center w-full mt-8 font-bold text-2xl">Gefferson Parra</p>
          <div className="flex flex-col items-center mt-6 gap-4 w-full">
            <a href="https://github.com/GeffersonParra" target="_blank" className="flex items-center justify-center gap-4 hover:opacity-70 transition-opacity">
              <FaGithub className="text-3xl" />
              <p className="hidden sm:block">GeffersonParra</p>
            </a>
            <a href="https://linkedin.com/in/gefferson-parra-vargas-497802336" target="_blank" className="flex items-center gap-4 hover:opacity-70 transition-opacity">
              <FaLinkedinIn className="text-3xl" />
              <p className="hidden sm:block">Gefferson Parra</p>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left w-full max-w-6xl">
          <div className="text-4xl md:text-6xl font-family-lack-line">{t("hi")}</div>
          <div className="text-4xl md:text-6xl/tight">
            {t("hero")}
            <div className="block lg:inline-block lg:ml-4">
               <RotatingText items={wordsArray}/>
            </div>
            <p className="text-lg md:text-2xl mt-6 max-w-xl mx-auto lg:mx-0" style={{ color: 'var(--text-muted)' }}>
              {t("specialized")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 mt-4 items-center justify-center xl:justify-start">
            <div className="relative w-full sm:w-64">
              <Link
                href={"#contact"}
                className="relative z-20 btn-primary flex text-xl md:text-2xl justify-center gap-2 items-center w-full h-14 text-white active:scale-95 transition-transform"
              >
                <MdOutlineEmail className="text-3xl md:text-4xl shrink-0" />
                {t("herobtn1")}
              </Link>
              <div 
                className="absolute z-10 w-full h-14 border-static top-0 left-0" 
                style={{ '--custom-border-color': 'var(--border-accent)' } as any} 
              />
            </div>
            <div className="relative w-full sm:w-64">
              <button
                className="relative z-20 btn-secondary flex text-xl md:text-2xl justify-center gap-2 items-center w-full h-14 text-white active:scale-95 transition-transform"
                onClick={() => handleDownload()}
              >
                <MdDownload className="text-3xl md:text-4xl shrink-0" />
                {t("herobtn2")}
              </button>
              <div 
                className="absolute z-10 w-full h-14 border-static top-0 left-0" 
                style={{ '--custom-border-color': 'var(--border-accent)' } as any} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}