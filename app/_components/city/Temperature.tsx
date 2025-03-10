import { DailyTemperature } from "@/types"
import { ArrowDown, ArrowUp, Moon, Sun } from "lucide-react"






const Temperature = ({temp}:{temp:DailyTemperature}) => {
  return (
    <div className="flex flex-col gap-6  p-4 border rounded    font-bold">
    <h3 className="text-gray-500 font-bold">{"Température"}</h3>
    <div className="flex gap-6 justify-center items-center">
      <div className="flex gap-2 text-red-500 justify-center items-center ">
        {" "}
        <ArrowUp size={14} />{" "}
        <span className="">
          <sup className="mr-1">Max</sup>
          {temp.max}°C
        </span>
      </div>
      <div className="flex gap-2 text-blue-500 justify-center items-center ">
        <ArrowDown size={14} />{" "}
        <span>
          {" "}
          <sup className="mr-1">Min</sup> {temp.min}°C
        </span>
      </div>
    </div>
    <div className="flex gap-6 justify-center items-center ">
      <div className="flex justify-center items-center gap-2 text-yellow-600 ">
        {" "}
        <Sun size={14} />{" "}
        <span>
          <sup className="mr-1">Mat</sup>
          {temp.morn}°C
        </span>
      </div>
      <div className="flex justify-center items-center gap-2 text-gray-600 ">
        {" "}
        <Moon size={14} />{" "}
        <span>
          <sup className="mr-1">Soir</sup>
          {temp.eve}°C
        </span>
      </div>
    </div>
  </div>
  )
}

export default Temperature
