import { Gauge } from "lucide-react"





const Pressure = ({pressure}:{pressure:number}) => {
  return (
    <div className="flex flex-col gap-6  p-4 border rounded    font-bold">
    <h3 className="text-gray-500 font-bold">{"Préssion"}</h3>
    <div className="flex gap-2 text-purple-500">
       <Gauge/> {pressure}<sup>hPa</sup>
    </div>
      
    </div>
  )
}

export default Pressure
