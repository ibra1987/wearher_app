import { DailyTemperature } from "@/types"
import { ArrowDown, ArrowUp, Gauge, Moon, Sun, SunDim, SunDimIcon, SunMoon } from "lucide-react"






const Temperature = ({temp,cssClass, itemHeaderClass}:{temp:DailyTemperature,cssClass:string,itemHeaderClass:string}) => {
  return (
    <div className={`${cssClass} pb-4 md:pb-0  `}>
    <h3 className={`${itemHeaderClass} `}>

      <span>
      {"Température"}
      </span>
      <span className="inline-block p-1 rounded  ">
      <Sun   size={16}/> 
      </span>
     
    </h3>
    <div className="w-full flex">
    <div className="w-full flex flex-col justify-center items-start p-1">
      <div className="flex gap-1 justify-center items-center  rounded p-1  ">
        {" "}
       <span className="inline-block p-1 rounded bg-red-100 text-red-500">
            <ArrowUp className="" size={16} />{" "}
       </span>
        <div className="   ">
          <sup className="mr-1 text-xs text-slate-400">Max</sup>
          <span className=" text-2xl ">
          {temp.max}<sup className="">°C</sup>
          </span>
        </div>
      </div>
      <div className="flex gap-1   justify-center items-center   rounded p-1 ">
      <span className="inline-block p-1 rounded bg-blue-100 text-blue-600 ">

        <ArrowDown size={16} />{" "}
        </span>
        <div className="   ">
          <sup className="mr-1 text-xs text-slate-400">Min</sup>
          <span className=" text-2xl ">
          {temp.max} <sup className="">°C</sup>
          </span>
        </div>
      </div>
    </div>
    <div className="w-full flex flex-col justify-center items-start p-1">
      <div className="flex justify-center items-center gap-1   rounded p-1 ">
      <span className="inline-block p-1 rounded bg-yellow-160 bg-yellow-400 text-yellow-700">

        <Sun size={16} />{" "}
        </span>
        <div className="   ">
          <sup className="mr-1 text-xs text-slate-400">Mat</sup>
          <span className=" text-2xl ">
          {temp.morn}<sup className="">°C</sup>
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-1    rounded p-1 ">
      <span className="inline-block p-1 rounded bg-gray-700 text-gray-300 ">

        <Moon size={16} />{" "}
        </span>
        <div className=" text-gray-600  ">
          <sup className="mr-1 text-xs text-slate-400">Soir</sup>
          <span className=" text-2xl ">
          {temp.eve}<sup className="">°C</sup>
          </span>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
}

export default Temperature
