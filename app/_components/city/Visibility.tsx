import { Eye } from "lucide-react";

const Visibility = ({
  title,
  visibility,
  cssClass,
  itemHeaderClass,
}: {
  title:string,
  visibility: number;
  cssClass: string;
  itemHeaderClass: string;
}) => {
  return (
    <div className={`${cssClass} pb-12`}>
      <h3 className={`${itemHeaderClass}`}>
        {title}
        <span className="inline-block p-1 rounded ">
          <Eye size={16} />
        </span>
      </h3>
      <div className="w-full flex  justify-center items-center gap-1    p-4 ">
      <span className="inline-block p-1 rounded bg-indigo-100 text-indigo-600">
        <Eye size={16}/>
        </span>
          <span className="text-2xl "> {visibility/1000}</span>
          <sup className="text-xs text-slate-400">Km</sup>
      </div>
    </div>
  );
};

export default Visibility;
