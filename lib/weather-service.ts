import { Coordinates, ForecastData, GeocodingResponse, WeatherResponse } from "@/types"
import { APICONFIG } from "./api-config"


interface ServerProps {
    coords:Coordinates,
    lang:"fr" | "ar"
}
class WeatherService {

    private createUrl(endpoint:string,params:Record<string,string |number>){
        const searchParams = new URLSearchParams({
            appid:APICONFIG.DEFAULT_PARAMS.appid,
            ...params
        })

        return `${endpoint}?${searchParams.toString()}`
    }
    private async fetchData<T>(url:string):Promise<T>{
        const response = await fetch(url,{
            next:{revalidate:3600*6}
        })

        if(!response.ok){
            console.log(response)
            throw new Error(`Could not fetch data:${response.statusText}`)
        }

        return response.json()


    }
    async getCurrentWeather(lat:number,lon:number,lang:"fr" |"ar"):Promise<WeatherResponse>{
        const url = this.createUrl(`${APICONFIG.BASE_URL}`,{
            lat:lat.toString(),
            lon:lon.toString(),
            lang,
            units:APICONFIG.DEFAULT_PARAMS.units,
            exclude:"minutely,hourly,alerts"
        })
        

        return this.fetchData<WeatherResponse>(url)

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
           
        })
        

        return this.fetchData<GeocodingResponse[]>(url)
    }

    async getWeatherByCityId(id:number):Promise<WeatherResponse>{
        const url = this.createUrl(`${APICONFIG.BASE_URL}?id=${id}`,{
            units:APICONFIG.DEFAULT_PARAMS.units,
            
        })
        console.log(url)
    
        return this.fetchData<WeatherResponse>(url)
    }

}


export const weatherService = new WeatherService()