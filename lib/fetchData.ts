import { citiesWithCoords } from "@/assets/main-cities-with-coords";
import { Coordinates, WeatherResponse } from "@/types";



 export async function getCityCurrentData({lat,lon}:Coordinates):Promise<null | WeatherResponse>{
   
    const responsePromise = await fetch("/api/current",{
        method:"POST",
        body:JSON.stringify({lat,lon}),
        headers:{
            "Content-Type":"application/jspn"
        }
    })

    if(!responsePromise.ok){
       return null
    }
 
    const res = await responsePromise.json()
    return res
}


export async function getMainCitiesCurrentData(limit:number=10){

    try {
        const data = Promise.all(citiesWithCoords.map(async (city)=> await getCityCurrentData({lat:city.lat,lon:city.lon})))
        return data
    } catch (error) {
        throw new Error("Error fetching data")
    }

}