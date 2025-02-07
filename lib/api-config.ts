



export const APICONFIG = {
    BASE_URL:"https://api.openweathermap.org/data/2.5",
    GEO_URL :"https://api.openweathermap.org/geo/1.0" ,
    API_KEY:process.env.WEATHER_API_KEY!,
    DEFAULT_PARAMS:{
        units:"metric",
        appid:process.env.WEATHER_API_KEY!

    }
}