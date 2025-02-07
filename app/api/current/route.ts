import { weatherService } from "@/lib/weather-service"
import { NextRequest, NextResponse } from "next/server"




export async function POST(req:Request){

    const body = await req.json()
    if(!body  || !Object.keys(body).length || !body.lat || !body.lon){

        return NextResponse.json({
            error:"No info provided"

        },{status:400})
    }
    try {
      
     const response = await weatherService.getCurrentWeather({lat:body.lat,lon:body.lon},body.lang)

        return NextResponse.json(response,{
            status:200
        })
        
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({
            error:error && typeof error === "object" && "message" in error ? error.message : "Something went wrong"
        })
    }
    }