import { weatherService } from "@/lib/weather-service";
import { ApiResponse, IServerResponse, WeatherResponse } from "@/types";
import { NextResponse } from "next/server";
export async function GET(req:Request) {
  return NextResponse.json({
      message:req.referrer
  })
  
}

export async function POST(
  req: Request
): ApiResponse<IServerResponse<WeatherResponse | string>> {
  try {
    console.log("hit")
    const body = (await req.json()) as {
      lat: string;
      lon: string;
      lang: "fr" | "ar";
    };

    if (!body.lat || !body.lon || !body.lang)
      throw new Error("Missing coordinates");
    const weatherData = await weatherService.getCurrentWeather(
      Number(body.lat),
      Number(body.lon),
      body.lang
    );
    if (!weatherData) throw new Error("Failed to fetch data");
    console.log(weatherData);
    return NextResponse.json({ status: "success", data: weatherData });
  } catch (error: unknown) {
    return NextResponse.json({
      status: "error",
      message:error && typeof error === "object" && "message" in error ? error.message as string : "an error occured" ,
    });
  }
}
