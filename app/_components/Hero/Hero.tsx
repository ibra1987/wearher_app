
import { formatDate } from "@/lib/utils";
import SearchForm from "./SearchForm";
import { getLocale, getTranslations } from "next-intl/server";





const Hero = async () => {
    const lang = await getLocale()
    const date = new Date()
    const localeFormat = lang === "fr" ? "fr-FR" : "ar-MA"
    const t = await getTranslations("HomePage");

  return (
    <div className="w-full relative px-10 flex flex-col gap-4 justify-center items-center h-[400px] rounded text-gray-900  bg-gradient-to-br  dark:text-muted-foreground">
       {/** bg-gradient-to-br  from-blue-500 via-indigo-600  to-purple-700 */}
        <div className="w-full flex flex-col justify-center gap-6 items-center">
        <h2 className="top-2 border-b border-b-blue-500 text-blue-500 px-2 absolute  flex justify-left items-center gap-6 text-left ">
             <span className="">
            {formatDate(date,localeFormat)} 
             </span>
            
         </h2>
        <h1 className="  font-black drop-shadow-md tracking-tighter leading-6">
          <span className="text-4xl md:text-5xl text-blue-500  xl:text-6xl">
          {t("headerPartOne")}
            </span><br/>
            <span className=" px-2 text-gray-500 text-xl md:text-2xl lg:text-3xl">
            {t("headerPartTwo")}
            </span>
        </h1>
        <SearchForm/>
        </div>

        </div>
    
  )
}

export default Hero