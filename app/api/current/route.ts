import { weatherService } from "@/lib/weather-service"
import { getLocale } from "next-intl/server"
import { NextResponse } from "next/server"




export async function POST(req:Request){

    const body = await req.json()
    const lang = await getLocale() ?? 'fr'
    if(!body  || !Object.keys(body).length || !body.lat || !body.lon){

        return NextResponse.json({
            error:"No info provided"

        },{status:400})
    }
    try {
      
     const response = await weatherService.getCurrentWeather({lat:body.lat,lon:body.lon},lang)
 
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