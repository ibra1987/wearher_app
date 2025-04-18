import { getMostAccurateLocation } from "@/lib/utils"
import { weatherService } from "@/lib/weather-service"
import { ApiResponse, GeocodingResponse, IServerResponse } from "@/types"
import { NextResponse } from "next/server"



export async function POST(req:Request):ApiResponse<IServerResponse<GeocodingResponse>>{

    try {

       const {lat,lon} = await req.json()
       if(!lat || !lon){
        return NextResponse.json({
            status:"error",
            message:"No coords provided"
        },{status:400})
       }
       const geoLocations = await weatherService.getReverseGeocode({lat,lon})
      const closest = getMostAccurateLocation(lat,lon,geoLocations)

       return NextResponse.json({
        data:closest,
        status:"success"
       },{status:200})

    
        
    } catch (error:unknown) {
        return NextResponse.json({
            status:"error",
            message:error && typeof error === "object" && "message" in error ? error.message as string : "an error occured" ,

        },{status:500})
    }
}