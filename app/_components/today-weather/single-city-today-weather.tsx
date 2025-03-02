"use client"

import { citiesWithCoords } from "@/assets/main-cities-with-coords";
import { getCityName } from "@/lib/utils";
import { WeatherResponse } from "@/types"




const SingleCityTodayWeather = ({cityData}:{cityData:WeatherResponse}) => {

  
  return (
    <div
        
          className="w-full grid grid-cols-5 p-1 md:p-2 border-b justify-items-center items-center"
        >
          <h3 className="w-full text-gray-700 flex justify-between items-center   rounded">
            <span className=" text-xs sm:text-sm md:text-base  md:font-medium">
              {getCityName(cityData.lat, cityData.lon)}
            </span>{" "}
          </h3>
          {/** temp */}
          <div className="flex justify-between gap-4">
            <div>
              <sup className="text-blue-400 text-xs">min</sup>{" "}
              <span className="text-blue-500 text-xs sm:text-sm md:text-base">
                {" "}
                {cityData.daily && cityData.daily[0].temp.min}°C
              </span>
            </div>
            <div>
              <sup className="text-red-400 text-xs">max</sup>{" "}
              <span className="text-red-500 text-xs sm:text-sm md:text-base ">
             
                {cityData.daily && cityData.daily[0].temp.max}°C
              </span>
            </div>
          </div>
          {/** feels like */}
          <span className="text-orange-500 text-xs sm:text-sm md:text-base ">
            {cityData.daily && cityData.daily[0].feels_like.day}°C
          </span>
          {/** humidity */}
          <span className="text-blue-400 text-xs sm:text-sm md:text-base">
            {cityData.daily && cityData.daily[0].humidity}%
          </span>
          {/** wind */}
          <span className="text-emerald-600 text-xs sm:text-sm md:text-base">
            {cityData.daily && cityData.daily[0].wind_speed} km/h
          </span>
        </div>
  )
}

export default SingleCityTodayWeather
