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
    <div className="min-h-screen flex flex-col gap-6 justify-start items-start py-16  rounded">
      <h1 className="text-4xl font-black text-gray-700">
        {" Prévisons méteo ville de"}{" "}
        {city.charAt(0).toUpperCase() + city.slice(1)}
      </h1>
        
      <div className="w-full flex flex-col justify-start items-center rounded   gap-0.5  ">
       {/**Today */}
     
        {/**Summary */}
        <div className="w-full flex gap-10 justify-start items-center  p-4   ">
        <h2 className="text-2xl text-gray-500 font-bold">{" Aujourd'hui"}</h2>
          <div className="flex gap-2 justify-start items-center">
          <Image alt="weather_icon" src={`https://openweathermap.org/img/wn/${weatherToday.weather[0].icon}.png`} width={50} height={50}/>
          <p className="text-gray-500">{weatherToday.weather[0].description} </p>
          </div>
         <div>
         
         </div>
        </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 ">
          {/**Temparatures */}
       <Temperature temp={weatherToday.temp}/>
       {/** Pressure */}
       <Pressure pressure={weatherToday.pressure}/>
       {/**Sunrise seunset */}
       <Sun sunInfo={{sunrise:weatherToday.sunrise,sunset:weatherToday.sunset}}/>
       {/**Humidity */}
       <Humidity humidity={weatherToday.humidity}/>
       {/**Wind */}
       <Wind wind={{deg:weatherToday.wind_deg,speed:weatherToday.wind_speed}}/>
       {/**Visibiity */}
       <Visibility visibility={response.data.current.visibility}/>
      </div>

      </div>
    </div>
  );
}

export default CityPage;
