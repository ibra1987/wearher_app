import { AirVent, ArrowUp, Waves, WindIcon } from "lucide-react"

const Wind = ({title,wind,cssClass,itemHeaderClass}:{title:string,wind:{speed:number,deg:number},cssClass:string,itemHeaderClass:string}) => {
  return (
    <div className={`${cssClass} pb-12`}>
    <h3 className={`${itemHeaderClass}`}>{title}
    <span className="inline-block p-1 rounded ">
      <WindIcon   size={16}/> 
      </span>
    </h3>
<div className="w-full flex justify-center items-center  gap-6">
   <div className="flex justify-center items-center gap-2 ">
    <div  className="flex justify-center items-center   gap-2 p-2 rounded ">
      <span className="inline-block p-1 rounded bg-green-100 text-green-600">
      <Waves size={16}/>
        </span>
        <span className="text-2xl"> {wind.speed}{" "}</span>km/h
    </div>
    </div>
  
    <div className="w-full flex justify-center items-center gap-2 ">
     <div className=" flex  justify-start items-center gap-2">
           {/* Wind Direction Circle */}
      <div className="relative w-[60px] h-[60px] flex justify-center items-center rounded-full border-2 border-slate-300   p-4">
        {/* Direction Labels */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xs  text-slate-500 ">N</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs  text-slate-500">S</span>
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs  text-slate-500 ">O</span>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs  text-slate-500">E</span>

        {/* Rotating Arrow */}
        <div
          className="w-[80px] h-[80px] flex justify-center items-center rounded-full  "
          style={{
            transform: `rotate(${wind.deg}deg)`,
            display: "",
          }}
        >
          <ArrowUp size={24} strokeWidth={2} className="text-emerald-900" />
        
        </div>
      </div>

      {/* Wind Degree Display */}  <div className=" text-2xl">{wind.deg}°</div>
    
     </div>
    </div>
    
  </div>

</div>
  )
}

export default Wind
