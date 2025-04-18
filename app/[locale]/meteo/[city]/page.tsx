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
  const gridItemClass = "  w-full   shadow-md p-2 rounded  flex flex-col justify-start items-center    text-gray-600  font-bold"
  const ItemHeaderClass = "w-full flex    flex-row-reverse justify-end gap-2 py-4 text-gray-400 items-center rounded text-gray-600 px-2"
  const response = await getCityWeatherData(city);
  if (
    !response.data ||
    response.status === "error" ||
    typeof response.data === "string"
  )
    return <div>{response.message}</div>;
  const weatherToday = response.data.daily![0] ?? response.data.current;
  const weatherTomorrow = response.data.daily![1];

  return (
<div className="min-h-screen py-16 px-4 text-gray-700">
  <h1 className="text-4xl font-extrabold mb-8">
    {t1("previsionsMeteo")} - {t(city.charAt(0).toUpperCase()+city.slice(1))}
  </h1>

  {/* Today Section */}
  <section className="w-full rounded p-6 mb-10 bg-gradient-to-b from-blue-100 to-blue-50 ">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6  p-4 text-gray-600 ">
      <h2 className="text-2xl font-black text-blue-700">{t1("today")}</h2>
      <div className="text-sm ">
        Température ressentie: <span className="font-semibold text-blue-600">{weatherToday.feels_like.day}°C</span>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Temperature title={t1("temperature")} itemHeaderClass={ItemHeaderClass} temp={weatherToday.temp} cssClass={`${gridItemClass} bg-white`} />
      <Pressure title={t1("pressure")} itemHeaderClass={ItemHeaderClass} pressure={weatherToday.pressure} cssClass={`${gridItemClass} bg-white`} />
      <Sun title={{levee:t1("sunrise"),couchee:t1("sunset")}} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white`} sunInfo={{ sunrise: weatherToday.sunrise, sunset: weatherToday.sunset }} />
      <Humidity title={t1("humidity")} itemHeaderClass={ItemHeaderClass} humidity={weatherToday.humidity} cssClass={`${gridItemClass} bg-white`} />
      <Wind title={t1("wind")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white`} wind={{ deg: weatherToday.wind_deg, speed: weatherToday.wind_speed }} />
      <Visibility title={t1("visibility")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white`} visibility={response.data.current.visibility} />
    </div>
  </section>

  {/* Tomorrow Section – repeat same structure */}
  <section className="w-full rounded-2xl p-6  bg-gradient-to-t from-red-100 to-red-50">
    <div className="flex flex-col md:flex-row justify-between items-center  rounded mb-6">
      <h2 className="text-2xl font-black text-red-500 ">{t1("tomorrow")} </h2>
      <div className="text-sm">
        Température ressentie: <span className="font-semibold text-red-500">{weatherTomorrow.feels_like.day}°C</span>
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

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Temperature title={t1("temperature")} itemHeaderClass={ItemHeaderClass} temp={weatherTomorrow.temp} cssClass={`${gridItemClass} bg-white`} />
      <Pressure  title={t1("pressure")} itemHeaderClass={ItemHeaderClass} pressure={weatherTomorrow.pressure} cssClass={`${gridItemClass} bg-white`} />
      <Sun title={{levee:t1("sunrise"),couchee:t1("sunset")}} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white`} sunInfo={{ sunrise: weatherTomorrow.sunrise, sunset: weatherTomorrow.sunset }} />
      <Humidity title={t1("humidity")} itemHeaderClass={ItemHeaderClass} humidity={weatherTomorrow.humidity} cssClass={`${gridItemClass} bg-white`} />
      <Wind title={t1("wind")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white`} wind={{ deg: weatherTomorrow.wind_deg, speed: weatherTomorrow.wind_speed }} />
      <Visibility  title={t1("visibility")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white`} visibility={response.data.current.visibility} />
    </div>
  </section>
  {/** next 15 days  */}
  <section className="w-full rounded-2xl p-6 ">
    <h2 className="text-2xl font-black text-gray-700 "> {t1("next15Days")}</h2>
      
  </section>
</div>

  );
}

export default CityPage;
