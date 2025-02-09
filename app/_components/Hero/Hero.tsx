import { formatDate } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl"
import SearchForm from "./SearchForm";
import { weatherIcons } from "@/assets/icons";





const Hero = () => {
    const lang = useLocale()
    const date = new Date()
    const localeFormat = lang === "fr" ? "fr-FR" : "ar-MA"
    const t = useTranslations("HomePage");

  return (
    <div className="w-full    px-10 flex flex-col gap-4 justify-center items-center h-[400px] rounded text-white dark:text-muted-foreground bg-gradient-to-r from-sky-500 via-indigo-700  to-purple-700">
      
        <div className="w-full flex flex-col justify-center gap-6 items-center">
        <h2 className="w-full md:w-3/5  flex justify-left items-center text-gray-300 gap-6 text-left ">
             <span className=" font-black">
            {formatDate(date,localeFormat)} 
             </span>
            
         </h2>
        <h1 className="  font-black drop-shadow-md tracking-tighter leading-6">
          <span className="text-6xl">
          {t("headerPartOne")}
            </span><br/>
            <span className=" px-2 text-gray-300 text-3xl">
            {t("headerPartTwo")}
            </span>
        </h1>
        <SearchForm/>
        </div>

        </div>
    
  )
}

export default Hero