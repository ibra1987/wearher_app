import client from "./connection";
import { CityMetaData } from "@/types";




 async function insertMetaData(city:CityMetaData):Promise<string> {
    try {
        await client.connect()
        const citiesTable = client.db("weather_db").collection("cities_coords")
        const queryResponse = (await citiesTable.insertOne(city))
        return queryResponse.insertedId.toString()
        


    } catch (error) {
        console.log(error)
        throw error
    }finally{
        await client.close()
    }
    



} 

export default {insertMetaData}