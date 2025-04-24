import Humidity from "@/app/_components/city/Humidity";
import Pressure from "@/app/_components/city/Pressure";
import Sun from "@/app/_components/city/Sun";
import Temperature from "@/app/_components/city/Temperature";
import Visibility from "@/app/_components/city/Visibility";
import Wind from "@/app/_components/city/Wind";
import DailyForecast from "@/app/_components/daily-forecast";
import {  getCityWeatherData } from "@/app/actions";
import {  getTranslations } from "next-intl/server";
import Image from "next/image";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

async function CityPage({ params }: CityPageProps) {
  let { city } = await params;
  const t =await getTranslations("Cities")
  const t1 = await getTranslations("Meteo")
  if (!city) return null;
  const gridItemClass   = "  w-full h-[160px] border-b border-b-gray-200  rounded  flex flex-col justify-start items-center   text-gray-600  font-bold"
  const ItemHeaderClass = "w-full flex text-gray-600 bg-gradient-to-r from-gray-50 to-gray-200  flex-row-reverse justify-end  gap-2 items-center rounded text-gray-600 p-2"
  city = city.includes("-") ? city.replaceAll("-"," ") : city
  const weatherData = await getCityWeatherData(city);
  if (
    !weatherData.data ||
    weatherData.status === "error" ||
    typeof weatherData.data === "string"
  )
    return <div>{weatherData.message}</div>;
  const weatherToday = weatherData.data.daily ? weatherData.data.daily[0] : undefined;
  const weatherTomorrow = weatherData.data.daily ?  weatherData.data.daily[1] : undefined;
  const weekForecast = weatherData.data.daily
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
 
  const setDate = (days:number)=>{
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + days);
    
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0"); 
    
    const formattedDate = `${dd}-${mm}`;
    return formattedDate
  }
 

  return (
<div className="min-h-screen  w-full flex flex-col gap-2 md:flex-row justify-start md:justify-center items-center  md:items-start py-16 px-4 text-gray-700">
 
  {/** data */}
  <div className="w-full md:w-3/4 bg-white  border border-gray-300  p-4 rounded-md flex flex-col">
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

      <Visibility title={t1("visibility")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white border  `} visibility={weatherData.data.current.visibility} />
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
      <Visibility  title={t1("visibility")} itemHeaderClass={ItemHeaderClass} cssClass={`${gridItemClass} bg-white border  `} visibility={weatherData.data.current.visibility} />
    </div>
  </section>
  )}
  {/** next 8 days  */}
  <section className="w-full rounded-2xl mt-6 ">
  <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-tr from-gray-600 to-black mb-6  p-4 rounded  text-white ">
      
    <h2 className="text-2xl font-black  "> {t1("next15Days")}</h2>
      </div>
      {weekForecast && weekForecast.map((dayData, index) => (
        <DailyForecast  key={setDate(0)} dayDate={setDate(index+2)} dayData={dayData} />
      ))}
  </section>
  </div>
   {/**sidebar */}
   <div className="w-full min-h-screen  bg-white border border-gray-300 rounded md:w-1/4">
     
     </div>
</div>

  );
}

export default CityPage;
