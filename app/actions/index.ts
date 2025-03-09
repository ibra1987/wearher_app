"use server"

import { citiesWithCoords } from "@/assets/main-cities-with-coords";
import {  IServerResponse, WeatherResponse } from "@/types";
import { getLocale } from "next-intl/server";





export async function getCityWeatherData(city:string):Promise<IServerResponse<WeatherResponse | string>>{
    const lang = await getLocale() as "fr" | "ar"
       const cityMetaData = citiesWithCoords.find((cityData) => cityData.name.trim().toLowerCase() === city.trim().toLowerCase())
 
       if(!cityMetaData){
              return {
                status:"error",
                message:"city does not exist"
              }
       }
       const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cities/city-weather`,{
                body:JSON.stringify({lat:cityMetaData.lat,lon:cityMetaData.lon,lang}),
                method:"POST",  
                next:{revalidate:21600},
                headers:{
                            "Content-Type":"application/json"
                    },
                    
                    
                })
        if(!response.ok){   
                return {
                    status:"error",
                    data:response.statusText
                }
        }
        const data = await response.json() as IServerResponse<WeatherResponse>
        return data 
    }