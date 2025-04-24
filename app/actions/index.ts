"use server"

import  citiesWithCoords  from "@/assets/main-cities-with-coords.json" 
import {  ForecastData, IServerResponse, WeatherResponse } from "@/types";
import { getLocale } from "next-intl/server";
import fs  from "node:fs/promises"
import path from "node:path";




export async function getCityWeatherData(city:string):Promise<IServerResponse<WeatherResponse | string>>{
    const lang = await getLocale() as "fr" | "ar" ?? "fr"
       let cityMetaData = citiesWithCoords.find((cityData) => cityData.name.trim().toLowerCase() === city.trim().toLowerCase())
 
       if(!cityMetaData){
        
        const requestCityLatLon = await fetch(`${process.env.OPENSTREET_URL!}/search?city=${encodeURIComponent(city.trim().toLowerCase())}&format=json&limit=1`)
        if(!requestCityLatLon.ok){
            return {
                status:"error",
                message:`Could not get the lat and lon for ${city}.` 
            }
        }
        
     
        const data = await requestCityLatLon.json()
        if(data.length === 0)  {
            return {
                status:"error",
                message:`Could not get the lat and lon for ${city}.` 
            }
        }
        cityMetaData = {
            name:city.charAt(0)+city.slice(1),
            lat:data[0].lat,
            lon:data[0].lon
        }
        console.log(cityMetaData)
       const   newCitiesData = [...citiesWithCoords,cityMetaData]
        const filePath = path.join(process.cwd(),"assets","main-cities-with-coords.json")

        await fs.writeFile(filePath,JSON.stringify(newCitiesData,null,2),"utf-8")
    }
    
       const response = await fetch(`/api/cities/city-weather`,{
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




export async function getCityForecast(city:string):Promise<IServerResponse<ForecastData | string>> {
    const lang = await getLocale() as "fr" | "ar" ?? "fr"

    const cityMetaData = citiesWithCoords.find((cityData) => cityData.name.trim().toLowerCase() === city.trim().toLowerCase())

   
    
    const response = await fetch(`/api/forecast`,{
        body:JSON.stringify({lat:cityMetaData!.lat,lon:cityMetaData!.lon,lang}),
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
const data = await response.json() as IServerResponse<ForecastData>
return data 
    
}