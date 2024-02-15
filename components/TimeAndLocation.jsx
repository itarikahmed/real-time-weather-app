import { FormatToLocalTime } from "@/utils/FormatToLocalTime";

const TimeAndLocation = ({ dt, timezone }) => {
  const formattedTime = FormatToLocalTime(Number(dt), timezone);
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">{formattedTime}</p>
      </div>
    </div>
  );
};
export default TimeAndLocation;
