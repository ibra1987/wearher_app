"use client";

import { DailyWeather } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";







const DailyForecast = ({dayData,key,dayDate}:{dayDate:string,dayData:DailyWeather,key:unknown}) => {
  const [isOpen,setIsOpen]=useState(false)
 
  return (
    <div key={key as string} onClick={()=>setIsOpen(!isOpen)} className="my-4 ">
    <div className="  w-full flex justify-between items-center border p-4 rounded hover:border-blue-400 cursor-pointer">
    <h3 className="font-bold text-gray-600">
    {dayDate}
    </h3>
    {isOpen? <Minus/> : <Plus/>}
    </div>
    {isOpen && (
      <div className="p-4 bg-gray-100 rounded">
        {/**  temperature*/}
        <div>
             Température: {dayData.temp.day}°C
          </div>
      </div>
    )}
</div>
  )
}

export default DailyForecast
