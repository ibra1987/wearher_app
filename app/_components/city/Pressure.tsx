import { Gauge } from "lucide-react";

const Pressure = ({
  title,
  pressure,
  cssClass,
  itemHeaderClass,
}: {
  title: string;
  pressure: number;
  cssClass: string;
  itemHeaderClass: string;
}) => {
  return (
    <div className={`${cssClass} `}>
      <h3 className={`${itemHeaderClass}`}>
        <span>{title}</span>

        <span className="inline-block p-1 rounded  ">
          <Gauge size={16} />
        </span>
      </h3>
      <div className="w-full flex h-full  justify-center items-center gap-1 p-2 ">
        <span className="inline-block p-1 rounded bg-indigo-100 text-indigo-600">
          <Gauge size={16} />
        </span>

        <span className="   "> {pressure}</span>
        <sup className="text-xs text-slate-400">hPa</sup>
      </div>
    </div>
  );
};

export default Pressure;
