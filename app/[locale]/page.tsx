import { getTranslations } from "next-intl/server";
import Hero from "../_components/Hero/Hero";
import WeatherGridToday from "../_components/weather-components-homepage/weather-grid-today";
import WeatherGridTomorrow from "../_components/weather-components-homepage/weather-grid-tomorrow";
import SearchForm from "../_components/Hero/SearchForm";
import EmailSubscription from "../_components/subscription/EmailSubscription";

export default async function HomePage() {
  const t = await getTranslations("HomePage")

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dd = String(tomorrow.getDate()).padStart(2, "0");
  const mm = String(tomorrow.getMonth() + 1).padStart(2, "0"); 
  const yyyy = tomorrow.getFullYear();
  
  const formattedDate = `${dd}-${mm}-${yyyy}`;

  return (
    <div className="w-full minh-screen flex flex-col gap-4 justify-start items-center">
     <Hero/>
       <h2 className="w-full p-4 text-2xl font-black text-gray-700 border-gray-200">
         {t("headerToday")}
       </h2>
         <WeatherGridToday/>
         <div className="w-full bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-700 rounded p-16 flex flex-col gap-4 justify-center items-center ">
           <h4 className="font-medium text-2xl text-white">{" Recherchez une une autre ville"}</h4>
          <SearchForm/>
         </div>
         <h2 className="w-full p-4 text-2xl font-black text-gray-700 border-gray-200">
         {t("headerTomorrow")}{" "} {formattedDate}
       </h2>
         <WeatherGridTomorrow/>
         <EmailSubscription/>
       
      </div>
  );
}