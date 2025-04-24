"use client";

import { DailyWeather } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";







const DailyForecast = ({dayData,index}:{dayData:DailyWeather,index:number}) => {
  const [isOpen,setIsOpen]=useState(false)
  const setDate = (days:number)=>{
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + days);
    
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0"); 
    
    const formattedDate = `${dd}-${mm}`;
    return formattedDate
  }
  return (
    <div key={setDate(0)} onClick={()=>setIsOpen(!isOpen)} className="my-4 ">
    <div className="  w-full flex justify-between items-center border p-4 rounded hover:border-blue-400 cursor-pointer">
    <h3 className="font-bold text-gray-600">
    {setDate(index+2)}
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
