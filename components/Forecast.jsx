import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { FormatToLocalTime } from "@/utils/FormatToLocalTime";

const Forecast = ({ title, coord, units }) => {
  const { data } = useFetch("onecall", {
    ...coord,
    units,
    exclude: "current,minutely,hourly,alerts",
  });
  const { timezone } = data || {};

  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {data &&
          data.daily.slice(0, 7).map((item, index) => {
            const dt = item.dt;
            const formattedTime = FormatToLocalTime(dt, timezone, "ccc");
            const img = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <p className="font-light text-sm">{formattedTime}</p>
                <Image src={img} width={80} height={80} alt="" />
                <p className="font-medium">{`${item.temp.day.toFixed()}°`}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Forecast;
