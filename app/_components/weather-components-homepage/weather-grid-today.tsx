"use client";

import { getMainCitiesCurrentData } from "@/lib/fetchData";
import { WeatherResponse } from "@/types";
import { CloudSun, Droplets, Locate, Thermometer, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import SingleCityTodayWeather from "./single-city-today-weather";
import Link from "next/link";
import { getCityName } from "@/lib/utils";
import { useLocale } from "next-intl";

const WeatherGridToday = () => {
  const [data, setData] = useState<null | WeatherResponse[]>([]);
  const [visibleCities,setVisibleCities]=useState(10)
  const [error, setError] = useState("");
   const lang = useLocale()
   
   const loadMore =()=>{
    if(data){
      setVisibleCities(prev=>Math.min(prev+5,data?.length))
    }
   }


  useEffect(() => {
    
   
    
    // weather data
    getMainCitiesCurrentData()
      .then((res) => setData(res as null | WeatherResponse[]))
      .catch((error) => {
        console.log(error);
        setError("Une erreur est survenue.");
      });
  }, []);

  return (
    <>
    <div className="w-full relative flex flex-col justify-start items-center bg-purple-50/45 border border-purple-100 rounded p-4 shadow-md z-10">
      <div className="w-full h-[300px]   -top-[150px] -right-[300px] lg:-right-[600px]  absolute blur-3xl opacity-35 drop-shadow-xl -z-20 bg-gradient-to-tr from-blue-400 via-purple-600  to-blue-500">

      </div>
      <div className="w-full grid grid-cols-5 gap-2 justify-items-center  border-b border-b-blue-100 ">
        <div className="w-full">
          <h3 className="w-full text-gray-600 flex justify-start items-center p-2 gap-2 rounded">
          <Locate size={18}  className="text-gray-600" />
            <span className="text-gray-600 ">Ville</span>
          </h3>
        </div>

        <div className="flex justify-start items-center gap-2">
          <CloudSun size={18} className="text-gray-600" />
          <span className="text-gray-600">Température</span>
        </div>
        <div className="flex justify-start items-center gap-2">
          <Thermometer size={18} className="text-gray-600" />

          <span className="text-gray-600 "> Ressenti</span>
        </div>
        <div className="flex justify-start items-center gap-2">
          <Droplets size={18} className="text-gray-600" />
          <span className="text-gray-600 ">Humidité</span>
        </div>
        <div className=" flex justify-between items-center gap-2 ">
          <Wind size={18} className="text-gray-600" />
          <span className="text-gray-600 ">Vent</span>
        </div>
      </div>
      {/** dyanmic data */}
      {data?.slice(0,visibleCities).map((cityData, index) => (
        <Link  className="w-full flex hover:bg-slate-200/50"  key={cityData ? `${cityData.lat}-${cityData.lon}` : index} href={`/${lang}/meteo/${getCityName(cityData.lat,cityData.lon)?.trim().toLowerCase()}`}>
           <SingleCityTodayWeather index={index} cityData={cityData}  />
        </Link>
      ))}
    </div>
    <button disabled={visibleCities === data?.length} className=" bg-white rounded border border-slate-400 px-8 py-2 my-4 text-black font-medium" onClick={loadMore}>Voir Plus</button>

  </>);
};

export default WeatherGridToday;
