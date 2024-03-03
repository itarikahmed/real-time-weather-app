"use client";

import { useState } from "react";
import { cities } from "@/utils/constants";
import useFetch from "@/hooks/useFetch";
import { CiLocationOn } from "react-icons/ci";
import TemperatureDetails from "./TemperatureDetails";
import TimeAndLocation from "./TimeAndLocation";
import Forecast from "./Forecast";

const InputCities = () => {
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const [query, setQuery] = useState({ q: "Dhaka" });

  const { data, isLoading, isError } = useFetch("weather", { units, ...query });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching data</div>;
  }
  const {
    coord: { lat, lon } = {},
    main: { temp, feels_like, humidity, temp_min, temp_max } = {},
    name,
    sys: { country, sunrise, sunset } = {},
    weather: [{ main, icon } = {}] = [],
    wind: { speed } = {},
    dt,
    timezone,
  } = data || {};

  const handleUnitsChange = (event) => {
    const selectedUnit = event.target.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city !== "") setQuery({ q: city });
    setCity("");
  };

  const handleChange = (event) => {
    const city = event.target.value;
    setCity(city);
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
      {/* Nav Links */}
      <div className="flex items-center justify-between my-6 text-black">
        {cities.map((city) => (
          <button
            key={city.id}
            className="text-white text-lg font-medium"
            onClick={() => {
              setQuery({ q: city.title });
            }}
          >
            {city.title}
          </button>
        ))}
      </div>
      {/* Search for a city */}
      <div className="flex flex-row justify-between items-center my-10 space-x-4">
        <div className="flex flex-row items-center justify-center space-x-6">
          <form
            onSubmit={handleSubmit}
            className="mr-5 flex justify-center items-center space-x-4"
          >
            <input
              type="text"
              id="inputField"
              placeholder="Please enter a city name"
              value={city}
              onChange={handleChange}
              className="text-base font-light p-2 rounded-md shadow-xl focus:outline-none capitalize w-72"
            />
            <button
              type="submit"
              className="text-white text-base font-medium cursor-pointer bg-sky-800 px-6 py-2.5 rounded-md"
            >
              Submit
            </button>
          </form>
          {/* Current Location */}
          <CiLocationOn
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleLocationClick}
          />
        </div>
        {/* Metric or Fahrenheit Button */}
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
      <TimeAndLocation timezone={timezone} dt={dt} />
      <TemperatureDetails
        name={name}
        country={country}
        main={{ temp, feels_like, humidity, temp_min, temp_max }}
        sys={{ sunrise, sunset }}
        wind={speed}
        weather={{ main, icon }}
      />
      <Forecast title="Daily Forecast" coord={{ lat, lon }} units={units} />
    </div>
  );
};

export default InputCities;
