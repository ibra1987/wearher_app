import { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "@/types"
import { APICONFIG } from "./api-config"



class WeatherService {

    private createUrl(endoint:string,params:Record<string,string |number>){
        const searchParams = new URLSearchParams({
            appid:APICONFIG.DEFAULT_PARAMS.appid,
            ...params
        })

        return `${endoint}?${searchParams.toString()}`
    }
    private async fetchData<T>(url:string):Promise<T>{
        const response = await fetch(url,{
            next:{revalidate:3600}
        })

        if(!response.ok){
            throw new Error(`Could not fetch data:${response.statusText}`)
        }

        return response.json()


    }
    async getCurrentWeather({lat, lon}:Coordinates,lang:string):Promise<WeatherData>{
        const url = this.createUrl(`${APICONFIG.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            lang,
            units:APICONFIG.DEFAULT_PARAMS.units
        })
        

        return this.fetchData<WeatherData>(url)

    }
    async getForecast({lat, lon}:Coordinates):Promise<ForecastData>{
        const url = this.createUrl(`${APICONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:APICONFIG.DEFAULT_PARAMS.units
        })
        

        return this.fetchData<ForecastData>(url)
    }

    async getReverseGeocode({lat, lon}:Coordinates):Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${APICONFIG.GEO_URL}/reverse`,{
            lat:lat.toString(),
            lon:lon.toString(),
            limit:1
        })
        

        return this.fetchData<GeocodingResponse[]>(url)
    }

}


export const weatherService = new WeatherService()