import { AirVent, ArrowUp, Waves } from "lucide-react"

const Wind = ({wind}:{wind:{speed:number,deg:number}}) => {
  return (
    <div className="flex flex-col gap-6  p-4 border rounded    font-bold">
    <h3 className="text-gray-500 font-bold">{"Vent"}</h3>
<div className="flex gap-2 text-emerald-500">
   <span className="flex justify-center items-center gap-2 "> <Waves size={14}/> {wind.speed}{" "}km/h </span>
   <div> <span style={{ transform: `rotate(${wind.deg}deg)`, display: "inline-block" }}><ArrowUp size={14}  strokeWidth={2} /></span>  {wind.deg}% </div>
</div>
</div>
  )
}

export default Wind
