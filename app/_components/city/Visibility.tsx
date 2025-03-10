import { Eye } from "lucide-react"

const Visibility = ({visibility}:{visibility:number}) => {
  return (
    <div className="flex flex-col gap-6  p-4 border rounded    font-bold">
           <h3 className="flex justify-between items-center text-gray-300 rounded bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 p-4">
          
           {"Visibilité"}
           <Eye size={20}/>
           </h3>
    <div className="w-full flex justify-center items-center gap-2 text-3xl   text-indigo-500">

    <div className="w-[100px] flex justify-center items-center gap-2 h-[100px] border border-indigo-100 shadow-md rounded-full">
            <Eye size={14}/> <span> {visibility/1000}{" "}km</span>    
    </div>
      </div>
    </div>
  )
}

export default Visibility
