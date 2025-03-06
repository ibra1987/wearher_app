import { TcpNetConnectOpts } from "net";
import { NextResponse } from "next/server";

export interface Coordinates {
    lat: number;
    lon: number;
  }
  
  export interface GeocodingResponse {
    distance: number;
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
  }
  
  export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      sunrise: number;
      sunset: number;
      country: string;
    };
    name: string;
    dt: number;
  }
  
  export interface ForecastData {
    list: Array<{
      dt: number;
      main: WeatherData["main"];
      weather: WeatherData["weather"];
      wind: WeatherData["wind"];
      dt_txt: string;
    }>;
    city: {
      name: string;
      country: string;
      sunrise: number;
      sunset: number;
    };
  }



//mine
  export interface WeatherResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: CurrentWeather;
    minutely?: MinutelyWeather[];
    hourly?: HourlyWeather[];
    daily?: DailyWeather[];
    alerts?: WeatherAlert[];
  }
  
  export interface CurrentWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherCondition[];
  }
  
  export interface MinutelyWeather {
    dt: number;
    precipitation: number;
  }
  
  export interface HourlyWeather {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherCondition[];
    pop: number; // Probability of precipitation
  }
  
  export interface DailyWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary?: string;
    temp: DailyTemperature;
    feels_like: DailyFeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherCondition[];
    clouds: number;
    pop: number; // Probability of precipitation
    rain?: number;
    uvi: number;
  }
  
  export interface DailyTemperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  }
  
  export interface DailyFeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
  }
  
  export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface WeatherAlert {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
  }


  //server response 
  
 export type ApiResponse<T> = Promise<NextResponse<T>>
  export interface IServerResponse<T> {
       data?:T,
       status: "error" | "success",
       message?:string
  }
  