import queries from "@/db/queries";
import { ApiResponse, CityMetaData, IServerResponse } from "@/types";
import { NextResponse } from "next/server";



//TODO ADD AN AUTH TOKEN
export async function POST(req:Request):ApiResponse<IServerResponse<string>>{

    try {
        const city = await req.json() as CityMetaData

        if(!city) throw new Error("Invalid data")
        const response = await queries.insertMetaData(city)
        if(!response) throw new Error("Failed to insert data")
       
            return NextResponse.json({status:"success",data:response})
        
    } catch (error:unknown) {
        return NextResponse.json({status:"error",      message:error && typeof error === "object" && "message" in error ? error.message as string : "an error occured" ,
        })
    }
}