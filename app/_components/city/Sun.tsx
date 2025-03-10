import { Sunrise, Sunset } from "lucide-react"




const Sun = ({sunInfo}:{sunInfo:{sunrise:number,sunset:number}}) => {
  return (
    <div className="flex flex-col gap-6  p-4 border rounded    font-bold">
        <h3 className="text-gray-500 font-bold">Lever et Coucher du Soleil</h3>
        <div>
            <div className="flex justify-start items-center gap-2 text-yellow-600 ">
                <Sunrise size={14} />{" "}
                <span>
                <sup className="mr-1">Lever</sup>
                {new Date(sunInfo.sunrise * 1000).toLocaleTimeString("fr-FR", { timeZone: "GMT" })
            }
                </span>
            </div>
            <div className="flex justify-start items-center gap-2 text-gray-600 ">
                <Sunset size={14} />{" "}
                <span>
                <sup className="mr-1">Coucher</sup>
                {new Date(sunInfo.sunset*1000).toLocaleTimeString("fr-Fr",{timeZone:"GMT"})}
                </span>
            </div>
        </div>
      
    </div>
  )
}

export default Sun
