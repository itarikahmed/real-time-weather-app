"use client";

import { useState } from "react";
import { cities } from "@/utils/constants";
import useFetch from "@/hooks/useFetch";

import { CiLocationOn } from "react-icons/ci";
const Cities = () => {
  const [query, setQuery] = useState({ q: "London" });
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");

  const data = useFetch({ ...query });
  console.log(data);
  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };
  console.log(city);
  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(event.target.value);
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="w-1/2 mx-auto">
      <div className="flex items-center justify-between my-6 text-black">
        {cities.map((city) => (
          <button
            key={city.id}
            className="text-white text-lg font-medium"
            onClick={() => setQuery({ q: city.title })}
          >
            {city.title}
          </button>
        ))}
      </div>
      <div className="flex flex-row justify-between items-center my-10 space-x-4">
        <div className="flex flex-row items-center justify-center space-x-6">
          <form
            onSubmit={handleSubmit}
            className="mr-5 flex justify-center items-center space-x-4"
          >
            <input
              type="text"
              placeholder="Search for city...."
              className="text-xl font-light p-2 rounded-md  shadow-xl focus:outline-none capitalize placeholder:lowercase w-72"
            />
            <button
              type="submit"
              className="text-white text-base font-medium cursor-pointer bg-sky-800 px-6 py-2.5 rounded-md"
            >
              Search
            </button>
          </form>

          <CiLocationOn
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleLocationClick}
          />
        </div>

        <div className="flex flex-row items-center justify-center">
          <button
            name="metric"
            className="text-xl text-white font-light transition ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °C
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button
            name="imperial"
            className="text-xl text-white font-light transition ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cities;
