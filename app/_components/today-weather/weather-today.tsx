"use client";

import useGeolocation from "@/app/hooks/useGeolocation";
import { citiesWithCoords } from "@/assets/main-cities-with-coords";
import { getMainCitiesCurrentData } from "@/lib/fetchData";
import { WeatherData, WeatherResponse } from "@/types";
import { useLocale } from "next-intl";
import { useEffect, useState, useCallback } from "react";

const WeatherToday = () => {
  const lang = useLocale();
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [data,setData]=useState<null  | WeatherResponse[] >([])
  
  // Get user's location
   const {coordinates,error,loading} = useGeolocation()

  const getCityName = (lat:number,lon:number)=>{
    return citiesWithCoords.find(city=>city.lat === lat && city.lon === lon)!.name  
  }
useEffect(()=>{

  getMainCitiesCurrentData().then((res)=>setData(res as null  |  WeatherResponse[])).catch((error)=>console.log(error))
  console.log(data)
},[])


  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4">
     {data?.map((cityData,index)=>(
         
          cityData ? (
          <div className="w-full flex justify-center items-center " key={cityData ? `${cityData.lat}-${cityData.lon}` : index}>
                  {getCityName(cityData.lat,cityData.lon)}: {cityData.current.temp}°C
          </div>

          ) : null
         
     ))}
    {error}
    </div>
  );
};

export default WeatherToday;
