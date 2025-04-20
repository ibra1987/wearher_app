import { DailyTemperature } from "@/types"
import { ArrowDown, ArrowUp, Moon, Sun } from "lucide-react"






const Temperature = ({temp,cssClass,title, itemHeaderClass}:{title:string,temp:DailyTemperature,cssClass:string,itemHeaderClass:string}) => {
  return (
    <div className={`${cssClass}  `}>
    <h3 className={`${itemHeaderClass} `}>

      <span>
      {title}
      </span>
      <span className="inline-block p-1 rounded  ">
      <Sun   size={16}/> 
      </span>
     
    </h3>
    <div className="w-full h-full flex items-center justify-between px-2">
    <div className="w-full flex flex-col justify-center items-start p-2 gap-3">
      <div className="flex gap-2 justify-center items-center  rounded p-1  ">
        {" "}
       <span className="inline-block p-1 rounded bg-red-100 text-red-500">
            <ArrowUp className="" size={16} />{" "}
       </span>
        <div className="   ">
          <sup className="mr-1 text-xs text-slate-400">Max</sup>
          <span className="  ">
          {temp.max}<sup className="">°C</sup>
          </span>
        </div>
      </div>
      <div className="flex gap-2   justify-center items-center   rounded p-1 ">
      <span className="inline-block p-1 rounded bg-blue-100 text-blue-600 ">

        <ArrowDown size={16} />{" "}
        </span>
        <div className="   ">
          <sup className="mr-1 text-xs text-slate-400">Min</sup>
          <span className="  ">
          {temp.max} <sup className="">°C</sup>
          </span>
        </div>
      </div>
    </div>
    <div className="w-full flex flex-col justify-center items-start p-2 gap-3">
      <div className="flex justify-center items-center gap-2   rounded p-1 ">
      <span className="inline-block p-1 rounded bg-yellow-160 bg-yellow-400 text-yellow-700">

        <Sun size={16} />{" "}
        </span>
        <div className="   ">
          <sup className="mr-1 text-xs text-slate-400">Mat</sup>
          <span className="  ">
          {temp.morn}<sup className="">°C</sup>
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2    rounded p-1 ">
      <span className="inline-block p-1 rounded bg-gray-700 text-gray-300 ">

        <Moon size={16} />{" "}
        </span>
        <div className=" text-gray-600  ">
          <sup className="mr-1 text-xs text-slate-400">Soir</sup>
          <span className="  ">
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
