


"use client";

import { getMainCitiesCurrentData } from "@/lib/fetchData";
import { WeatherResponse } from "@/types";
import { CloudSun, Droplets, Locate, Pin, Thermometer, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCityName } from "@/lib/utils";
import { useLocale } from "next-intl";
import SingleCityTomorrowWeather from "./single-city-tomorrow-weather";

const WeatherGridTomorrow = () => {
  const [data, setData] = useState<null | WeatherResponse[]>([]);
  const [error, setError] = useState("");
   const lang = useLocale()
  
  useEffect(() => {
    getMainCitiesCurrentData()
      .then((res) => setData(res as null | WeatherResponse[]))
      .catch((error) => {
        console.log(error);
        setError("Une erreur est survenue.");
      });
  }, []);

  return (
    <div className="w-full relative flex flex-col justify-start items-center bg-purple-50/45 border border-purple-100 rounded p-4 shadow-md">
      {error && error}
      <div className="w-full grid grid-cols-5 gap-2 justify-items-center  border-b border-b-blue-100">
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
      {data?.map((cityData, index) => (
        <Link  className="w-full flex hover:bg-slate-100"  key={cityData ? `${cityData.lat}-${cityData.lon}` : index} href={`/${lang}/ville/${getCityName(cityData.lat,cityData.lon)?.trim().toLowerCase()}`}>
           <SingleCityTomorrowWeather cityData={cityData}  />
        </Link>
      ))}
    </div>
  );
};

export default WeatherGridTomorrow;
