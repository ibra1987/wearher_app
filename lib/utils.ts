import { citiesWithCoords } from "@/assets/main-cities-with-coords";
import { Coordinates, GeocodingResponse, IServerResponse } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date:Date, locale:string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long", // Full day name
    day: "numeric",
    month: "long", // Full month name
    year: "numeric"
  }).format(date);
}



export function getCityName(lat: number, lon: number) {
  const city = citiesWithCoords.find(
    (city) => city.lat === lat && city.lon === lon
  );
  if (!city) {
    return null;
  }

  return city.name;
};

export async function getLocationByCoords({lat,lon}:Coordinates):Promise<IServerResponse<GeocodingResponse>>{

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/geo`,{
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({lat, lon}),
      method:"POST"
    })

  if(!response.ok){
    throw new Error(`Error: ${response.statusText}`)
  }
  return  await response.json()
}


export function getMostAccurateLocation(userLat: number, userLon: number, locations: GeocodingResponse[]) {
  if (locations.length === 0) {
    throw new Error("No locations provided");
  }

  return locations.reduce((closest, location) => {
      const distance = Math.hypot(userLat - location.lat, userLon - location.lon);
      return !closest || distance < closest.distance 
          ? { ...location, distance } 
          : closest;
  }, { ...locations[0], distance: Math.hypot(userLat - locations[0].lat, userLon - locations[0].lon) });
}