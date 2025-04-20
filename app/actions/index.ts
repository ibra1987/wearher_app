"use server"

import { citiesWithCoords } from "@/assets/main-cities-with-coords";
import {  IServerResponse, WeatherResponse } from "@/types";
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
        citiesWithCoords.push(cityMetaData)
        const filePath = path.join(process.cwd(),"data","citiesWithCoords.ts")
        console.log(filePath)
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