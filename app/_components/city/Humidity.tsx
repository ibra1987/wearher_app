import { Droplets } from "lucide-react";

const Humidity = ({
  humidity,
  cssClass,
  itemHeaderClass
}: {
  humidity: number;
  cssClass: string;
  itemHeaderClass: string;
}) => {
  return (
    <div className={`${cssClass} pb-12 `}>
      <h3 className={`${itemHeaderClass}`} >
        <span>{"Humidité"}</span>
        <span className="inline-block p-1 rounded ">
          <Droplets size={16} />
        </span>
      </h3>

      <div className="w-full flex  justify-center items-center gap-2    p-2 ">
      <span className="inline-block p-1 rounded bg-blue-100 ">
            <Droplets size={16} />
          </span>
          <span className=" text-blue-800 text-2xl "> {humidity}</span>
          <sup className="text-xs text-blue-400">%</sup>
        </div>
      
    </div>
  );
};

export default Humidity;
