import {  ArrowUp, Waves, WindIcon } from "lucide-react"

const Wind = ({title,wind,cssClass,itemHeaderClass}:{title:string,wind:{speed:number,deg:number},cssClass:string,itemHeaderClass:string}) => {
  return (
    <div className={`${cssClass} `}>
    <h3 className={`${itemHeaderClass}`}>{title}
    <span className="inline-block p-1 rounded ">
      <WindIcon   size={16}/> 
      </span>
    </h3>
<div className="w-full h-full flex  justify-center items-center  ">
   <div className="w-full h-full flex justify-center items-center  ">
    <div  className="flex justify-center items-center gap-2    p-2 rounded ">
      <span className="inline-block p-1 rounded bg-green-100 text-green-600">
      <Waves size={16}/>
        </span>
        <span className=""> {wind.speed}{" "}</span>km/h
    </div>
    </div>
  
    <div className="w-full h-full flex justify-center items-center  ">
     <div className="w-full flex gap-2  justify-start items-center ">
           {/* Wind Direction Circle */}
    
        {/* Rotating Arrow */}
        <div
          className=" flex p-1 bg-emerald-50 justify-center items-center rounded-full  "
          style={{
            transform: `rotate(${wind.deg}deg)`,
            display: "",
          }}
        >
          <ArrowUp size={16} strokeWidth={2} className="text-emerald-900" />
        
      
      </div>

      {/* Wind Degree Display */}  <div className=" ">{wind.deg}°</div>
    
     </div>
    </div>
    
  </div>

</div>
  )
}

export default Wind
