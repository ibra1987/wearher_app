import Humidity from "@/app/_components/city/Humidity";
import Pressure from "@/app/_components/city/Pressure";
import Sun from "@/app/_components/city/Sun";
import Temperature from "@/app/_components/city/Temperature";
import Visibility from "@/app/_components/city/Visibility";
import Wind from "@/app/_components/city/Wind";
import { getCityWeatherData } from "@/app/actions";
import {  getTranslations } from "next-intl/server";
import Image from "next/image";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const t =await getTranslations("Cities")
  const t1 = await getTranslations("Meteo")
  if (!city) return null;
  const gridItemClass   = "  w-full h-[160px] border-b border-b-gray-200  rounded  flex flex-col justify-start items-center   text-gray-600  font-bold"
  const ItemHeaderClass = "w-full flex text-gray-600 bg-gradient-to-r from-gray-100 to-gray-300  flex-row-reverse justify-end  gap-2 items-center rounded text-gray-600 p-2"
  const response = await getCityWeatherData(city);
  if (
    !response.data ||
    response.status === "error" ||
    typeof response.data === "string"
  )
    return <div>{response.message}</div>;
  const weatherToday = response.data.daily ? response.data.daily[0] : undefined;
  const weatherTomorrow = response.data.daily ?  response.data.daily[1] : undefined;
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

  return (
<div className="min-h-screen w-full flex flex-col md:flex-row justify-start md:justify-center gap-2 items-center  md:items-start py-16 px-4 text-gray-700">
 
  {/** data */}
  <div className="w-full md:w-3/4  p-4 rounded-md flex flex-col">
  <h1 className="text-2xl md:text-4xl font-extrabold  mb-8">
    {t1("previsionsMeteo")} - {t.has(formattedCity) ? t(formattedCity) : formattedCity}
  </h1>

  {/* Today Section */}
  {weatherToday && (
    <section className="w-full rounded p-2 mb-10  ">
    <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-tr from-gray-600 to-black mb-6  p-4 rounded  text-white ">
      <h2 className="text-2xl font-black   rounded ">{t1("today")}</h2>
      <div className="text-sm ">
        Température ressentie: <span className="font-semibold ">{weatherToday.feels_like.day}°C</span>
      </div>
      <div className="flex items-center gap-2">
        <Image
          alt="weather_icon"
          src={`https://openweathermap.org/img/wn/${weatherToday.weather[0].icon}.png`}
          width={50}
          height={50}
        />
        <p className="capitalize">{weatherToday.weather[0].description}</p>
      </div>
    </div>

    {/* Grid Items */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Temperature title={t1("temperature")} itemHeaderClass={ItemHeaderClass} temp={weatherToday.temp} cssClass={`${gridItemClass} bg-white border  `} />
      <Pressure title={t1("pressure")} itemHeaderClass={ItemHeaderClass} pressure={weatherToday.pressure} cssClass={`${gridItemClass} bg-white border  `} />

      <Sun title={{levee:t1("sunrise"),couchee:t1("sunset")}} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white border  `} sunInfo={{ sunrise: weatherToday.sunrise, sunset: weatherToday.sunset }} />
      <Humidity title={t1("humidity")} itemHeaderClass={ItemHeaderClass} humidity={weatherToday.humidity} cssClass={`${gridItemClass} bg-white border  `} />

      <Wind title={t1("wind")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white border  `} wind={{ deg: weatherToday.wind_deg, speed: weatherToday.wind_speed }} />

      <Visibility title={t1("visibility")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white border  `} visibility={response.data.current.visibility} />
    </div>
  </section>
  )}

  {/* Tomorrow Section – repeat same structure */}
  {weatherTomorrow && (
    <section className="w-full rounded">
    <div className="flex flex-col md:flex-row justify-between items-center   mb-6 bg-gradient-to-tr from-gray-600 to-black p-4 rounded text-white ">
      <h2 className="text-2xl font-black  ">{t1("tomorrow")} </h2>
      <div className="text-sm">
        Température ressentie: <span className="font-semibold ">{weatherTomorrow.feels_like.day}°C</span>
      </div>
      <div className="flex items-center gap-2">
        <Image
          alt="weather_icon"
          src={`https://openweathermap.org/img/wn/${weatherTomorrow.weather[0].icon}.png`}
          width={50}
          height={50}
        />
        <p className="capitalize">{weatherTomorrow.weather[0].description}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Temperature title={t1("temperature")} itemHeaderClass={ItemHeaderClass} temp={weatherTomorrow.temp} cssClass={`${gridItemClass} bg-white border  `} />
      <Pressure  title={t1("pressure")} itemHeaderClass={ItemHeaderClass} pressure={weatherTomorrow.pressure} cssClass={`${gridItemClass} bg-white border  `} />
      <Sun title={{levee:t1("sunrise"),couchee:t1("sunset")}} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white border  `} sunInfo={{ sunrise: weatherTomorrow.sunrise, sunset: weatherTomorrow.sunset }} />
      <Humidity title={t1("humidity")} itemHeaderClass={ItemHeaderClass} humidity={weatherTomorrow.humidity} cssClass={`${gridItemClass} bg-white border  `} />
      <Wind title={t1("wind")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white border  `} wind={{ deg: weatherTomorrow.wind_deg, speed: weatherTomorrow.wind_speed }} />
      <Visibility  title={t1("visibility")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white border  `} visibility={response.data.current.visibility} />
    </div>
  </section>
  )}
  {/** next 15 days  */}
  <section className="w-full rounded-2xl ">
    <h2 className="text-2xl font-black text-gray-700 "> {t1("next15Days")}</h2>
      
  </section>
  </div>
   {/**sidebar */}
   <div className="w-full min-h-screen  bg-white border rounded md:w-1/4">
     
     </div>
</div>

  );
}

export default CityPage;
