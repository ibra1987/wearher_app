"use client";

import useGeolocation from "@/app/hooks/useGeolocation";
import { citiesWithCoords } from "@/assets/main-cities-with-coords";
import { getMainCitiesCurrentData } from "@/lib/fetchData";
import { WeatherData, WeatherResponse } from "@/types";
import { CloudSun, Droplets, Thermometer } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState, useCallback } from "react";

const WeatherToday = () => {
  const lang = useLocale();
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [data, setData] = useState<null | WeatherResponse[]>([]);

  // Get user's location
  const { coordinates, error, loading } = useGeolocation();

  const getCityName = (lat: number, lon: number) => {
    const city = citiesWithCoords.find(
      (city) => city.lat === lat && city.lon === lon
    );
    if (!city) {
      return null;
    }

    return city.name;
  };
  useEffect(() => {
    getMainCitiesCurrentData()
      .then((res) => setData(res as null | WeatherResponse[]))
      .catch((error) => console.log(error));
    console.log(data);
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-1 xl:gap-4">
      {data?.map((cityData, index) =>
        cityData ? (
          <div
            className="w-full bg-gray-50 border flex flex-col gap-4 rounded shadow-md py-10 px-1  justify-center  items-start "
            key={cityData ? `${cityData.lat}-${cityData.lon}` : index}
          >
            <h3 className="w-full text-gray-700 flex justify-between items-center p-2 bg-gray-100 rounded">
              <span className=" tracking-wider text-xl font-bold">{getCityName(cityData.lat, cityData.lon)}</span>{" "}
              <span className="">{cityData.current.temp}°C </span>
            </h3>

            {/** DISPLAY MIN AND MAX TEMP */}
            <div className="w-full  flex justify-between gap-0 px-2">
              <div className="flex justify-start items-center gap-1">
                <CloudSun size={20} color="orange" />
                <span className="text-gray-500 text-xs">Température</span>
              </div>
              <div className="flex gap-2">
                <div>
                  <sup className="text-blue-400 text-xs">min</sup>{" "}
                  <span className="text-blue-500">
                    {" "}
                    {cityData.daily && cityData.daily[0].temp.min}°C
                  </span>
                </div>
                <div>
                  <sup className="text-red-400 text-xs">max</sup>{" "}
                  <span className="text-red-500 ">
                    {" "}
                    {cityData.daily && cityData.daily[0].temp.max}°C
                  </span>
                </div>
              </div>
            </div>
            {/**TEMP FEELS LIKE */}
            <div className="w-full flex justify-between items-center px-2">
              <div className="flex justify-start items-center gap-1">
                <Thermometer size={20} className="text-red-500" />

                <span className="text-gray-500 text-xs"> Ressenti</span>
              </div>
              <span className="text-red-500 ">
                {cityData.daily && cityData.daily[0].feels_like.day}°C
              </span>
            </div>
            {/** DISPLAY HUMIDTY */}
            <div className="w-full flex justify-between px-2">
              <div className="flex justify-start items-center gap-1">
                <Droplets size={20} className="text-blue-500" />
                <span className="text-gray-500 text-xs">Humidité</span>
              </div>
              <span className="text-blue-400">
                {cityData.daily && cityData.daily[0].humidity}%
              </span>
            </div>
          </div>
        ) : null
      )}
      {error}
    </div>
  );
};

export default WeatherToday;
