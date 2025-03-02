import { getTranslations } from "next-intl/server";
import Hero from "../_components/Hero/Hero";
import WeatherToday from "../_components/today-weather/weather-today";
import WeatherGrid from "../_components/today-weather/weather-grid";

export default async function HomePage() {
  const t = await getTranslations("HomePage")



  return (
    <div className="w-full minh-screen flex flex-col gap-4 justify-start items-center">
     <Hero/>
       <h2 className="w-full p-4 text-2xl font-black text-gray-700 border-gray-200">
         {t("headerToday")}
       </h2>
         <WeatherGrid/>
      </div>
  );
}