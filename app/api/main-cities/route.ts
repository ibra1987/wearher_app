import { weatherService } from "@/lib/weather-service"
import { NextResponse } from "next/server"




export async function GET(req:Request){

  
    try {
   
    const ids = await req.json()
     const response = await weatherService.getWeatherByCityId(Number(ids[0]))

        return NextResponse.json(response,{
            status:200
        })
        
    } catch (error:unknown) {
        return NextResponse.json({
            error:error && typeof error === "object" && "message" in error ? error.message : "Something went wrong"
        })
    }
    }