import { weatherService } from "@/lib/weather-service";
import { ApiResponse, ForecastData, IServerResponse } from "@/types";
import { NextResponse } from "next/server";



export async function POST(request:Request):ApiResponse<IServerResponse<ForecastData | string>> {


    try {
        
     const reqBody = await request.json() as {
        lat: string;
        lon: string;
        lang: "fr" | "ar";
      };
      if (!reqBody.lat || !reqBody.lon || !reqBody.lang) throw new Error("Missing coordinates");

      const forecastData = await weatherService.getForecast({lat:Number(reqBody.lat),lon:Number(reqBody.lon)},reqBody.lang)
      if(!forecastData) throw new Error("Could not fetch  data from remote service.")


        return NextResponse.json({
            status:"success",
            data:forecastData,
        
        })
    } catch (error:unknown) {
        return NextResponse.json({
            status:"error",
            message:error && typeof error === "object" && "message" in error ? error.message as string : "Something bad happened server side."
        })
    }
    
}