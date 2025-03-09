import { getCityWeatherData } from "@/app/actions"
import {type WeatherResponse} from "@/types"
import { json } from "stream/consumers"

interface CityPageProps {
    params:Promise<{city:string}>
}


async function CityPage({params}:CityPageProps) {
    const {city} = await params
    if(!city) return null
    const response = await getCityWeatherData(city)
   if(response.status === "error") return <div>{response.message}</div>

  return (
    <div className="minh-screen flex flex-col justify-start items-start py-16">
     <h1 className="text-4xl font-black text-gray-700">{" Prévisons méteo ville de"} {city.charAt(0).toUpperCase()+city.slice(1)}</h1>
    <div>
      <h2 className="text-2xl text-gray-600 font-bold">{" Aujourd'hui"}</h2>
    </div>
    </div>
  )
}

export default CityPage