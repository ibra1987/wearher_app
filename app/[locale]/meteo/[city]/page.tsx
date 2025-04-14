import Humidity from "@/app/_components/city/Humidity";
import Pressure from "@/app/_components/city/Pressure";
import Sun from "@/app/_components/city/Sun";
import Temperature from "@/app/_components/city/Temperature";
import Visibility from "@/app/_components/city/Visibility";
import Wind from "@/app/_components/city/Wind";
import { getCityWeatherData } from "@/app/actions";

import Image from "next/image";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  if (!city) return null;
  const gridItemClass = "  w-full bg-white shadow-sm p-2 rounded  flex flex-col justify-start items-center    text-slate-600  font-bold"
  const ItemHeaderClass = "w-full flex    flex-row-reverse justify-end gap-2 py-4 text-slate-400 items-center rounded text-slate-600 px-2"
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
    <div className="min-h-screen flex flex-col gap-6 justify-start items-start py-16  rounded ">
      <h1 className="text-4xl pl-6 font-black text-gray-700">
        {" Prévisons méteo ville de"}{" "}
        {city.charAt(0).toUpperCase() + city.slice(1)}
      </h1>

      <div className="w-full flex flex-col justify-start items-center   gap-0.5  rounded   p-6  ">
        {/**Today */}

        {/**Summary */}
        <div className="w-full flex gap-10 justify-between items-center bg-slate-200/30 shadow-sm text-slate-700 p-4  rounded   ">
          <h2 className="text-2xl  font-bold">{" Aujourd'hui"}</h2>
          <div className="">
             <span>Ressenti:</span> <span className="font-bold">
             {weatherToday.feels_like.day}°C
             </span>
            </div>
          <div className="flex gap-2 justify-start items-center">
        
            <Image
              alt="weather_icon"
              src={`https://openweathermap.org/img/wn/${weatherToday.weather[0].icon}.png`}
              width={50}
              height={50}
            />
           
            <p className="">
              {weatherToday.weather[0].description}{" "}
            </p>
          </div>
        
        </div>
        <div className="w-full  grid grid-cols-1 sm:grid-cols-2  justify-items-center gap-1 md:grid-cols-3 mt-4 relative ">
         

          {/**Temparatures */}
          <Temperature itemHeaderClass={ItemHeaderClass} temp={weatherToday.temp} cssClass={gridItemClass} />
          {/** Pressure */}
          <Pressure itemHeaderClass={ItemHeaderClass} pressure={weatherToday.pressure} cssClass={gridItemClass}/>
          {/**Sunrise seunset */}
          <Sun
          itemHeaderClass={ItemHeaderClass}
          cssClass={gridItemClass}
            sunInfo={{
              sunrise: weatherToday.sunrise,
              sunset: weatherToday.sunset,
            }}
          />
          {/**Humidity */}
          <Humidity itemHeaderClass={ItemHeaderClass} humidity={weatherToday.humidity} cssClass={gridItemClass} />
          {/**Wind */}
          <Wind
          itemHeaderClass={ItemHeaderClass}
          cssClass={gridItemClass}
            wind={{
              deg: weatherToday.wind_deg,
              speed: weatherToday.wind_speed,
            }}
          />
          {/**Visibiity */}
          <Visibility itemHeaderClass={ItemHeaderClass} cssClass={gridItemClass} visibility={response.data.current.visibility} />
        </div>
      </div>
    </div>
  );
}

export default CityPage;
