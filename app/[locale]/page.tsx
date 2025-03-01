import { getTranslations } from "next-intl/server";
import Hero from "../_components/Hero/Hero";
import WeatherToday from "../_components/today-weather/weather-today";

export default async function HomePage() {
  const t = await getTranslations("HomePage")



  return (
    <div className="w-full minh-screen flex flex-col gap-10 justify-start items-center">
     <Hero/>
       <h2 className="w-full p-4 text-2xl font-black text-gray-700 border-b border-gray-200">
         {t("headerToday")}
       </h2>
         <WeatherToday/>
      </div>
  );
}