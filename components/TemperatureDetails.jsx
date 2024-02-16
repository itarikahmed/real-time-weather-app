import Image from "next/image";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdOutlineWindPower } from "react-icons/md";
import { IoSunny, IoCloudyNightSharp } from "react-icons/io5";
import { FormatToLocalTime } from "@/utils/FormatToLocalTime";

const TemperatureDetails = ({
  name,
  country,
  main,
  wind,
  weather,
  sys,
  timezone,
}) => {
  const { icon, main: description } = weather;
  const img = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div>
      {/* Weather and Temperature */}
      <div className="flex flex-row items-center justify-between text-white py-4">
        {/* Weather */}
        <div className="flex flex-col justify-center items-center">
          <Image src={img} alt="" width={100} height={100} className="w-20" />
          <h1 className="font-medium text-white text-xl">{description}</h1>
        </div>
        {/* Temperature */}
        <div className="flex flex-col space-y-6 items-center justify-center">
          <div className=" text-white font-semibold text-center text-4xl">
            <span>{name}</span>|<span>{country}</span>
          </div>
          <p className="text-5xl">{Math.round(main.temp)}&deg;C.</p>
        </div>

        <div className="flex flex-col space-y-2 items-start">
          <div className="flex font-light text-sm items-center justify-center">
            <FaTemperatureHigh className="mr-2" />
            Real fell:
            <span className="font-medium ml-1">
              {Math.round(main.feels_like)}&deg; C.
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <FaDroplet className="mr-2" />
            Humidity:
            <span className="font-medium ml-1">{main.humidity} %</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <MdOutlineWindPower className="mr-2" />
            Wind:
            <span className="font-medium ml-1">{Math.round(wind)} Km/h</span>
          </div>
        </div>
      </div>

      {/* Timing */}
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <IoSunny />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {FormatToLocalTime(Number(sys.sunrise), timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <IoCloudyNightSharp />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {FormatToLocalTime(Number(sys.sunset), timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <FaArrowUp />
        <p className="font-light">
          High:
          <span className="font-medium ml-1">
            {Math.round(main.temp_max)}&deg; C.
          </span>
        </p>
        <p className="font-light">|</p>

        <FaArrowDown />
        <p className="font-light">
          Low:
          <span className="font-medium ml-1">
            {Math.round(main.temp_min)}&deg; C.
          </span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureDetails;
