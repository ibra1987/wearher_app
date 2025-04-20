import { SunMoon, Sunrise, Sunset } from "lucide-react";

const Sun = ({
  title,
  sunInfo,
  cssClass,
  itemHeaderClass
}: {
  title:{levee:string,couchee:string},
  sunInfo: { sunrise: number; sunset: number };
  cssClass: string;
  itemHeaderClass:string
}) => {
  return (
    <div className={`${cssClass}`}>
      <h3 className={`${itemHeaderClass}`}>
        <span>{title.levee+"/"+title.couchee}</span>

        <span className="inline-block p-1 rounded ">
          <SunMoon size={16} />
        </span>
      </h3>
      <div className="w-full h-full flex items-center justify-between p-2 ">
        <div className="w-full flex justify-start items-center gap-2 px-2  ">
          <span className="inline-block p-1 rounded bg-orange-100 text-orange-600  ">
            <Sunrise size={16} />
          </span>
          <span>
            <span className=" ">
            {new Date(sunInfo.sunrise * 1000).toLocaleTimeString("fr-FR", {
              timeZone: "GMT",
            })}
            </span>
           
          </span>
        </div>
        <div className="w-full flex justify-start items-center gap-2 ml-4 text-gray-600">
          <span className="inline-block p-1 rounded bg-gray-700 text-yellow-300 ">
            <Sunset size={16} />{" "}
          </span>
          <div>
        
            <span className="   ">
              {new Date(sunInfo.sunset * 1000).toLocaleTimeString("fr-Fr", {
                timeZone: "GMT",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sun;
