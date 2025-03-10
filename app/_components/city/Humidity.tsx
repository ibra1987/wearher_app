import { Droplets } from "lucide-react"



const Humidity = ({humidity}:{humidity:number}) => {
  return (
    <div className="flex flex-col gap-6  p-4 border rounded    font-bold">
        <h3 className="flex justify-between items-center text-gray-300 rounded bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-4">
         
          {"Humidté"}
          <Droplets size={20}/>
          </h3>
    <div className="w-full flex justify-center items-center gap-2 text-3xl   text-blue-500">
      <div className="w-[100px] flex justify-center items-center gap-2 h-[100px] border border-blue-100 shadow-md rounded-full">
      <Droplets/> {humidity}%
      </div>
    </div>
    </div>
  )
}

export default Humidity
