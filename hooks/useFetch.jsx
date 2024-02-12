import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_DEV_API_URL;
const API_KEY = "e72d9632966d3c8bd27bdb73a0ba42c5";

const useFetch = (searchParams) => {
  const getWeatherData = async () => {
    const url = new URL(baseURL);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  };

  const { data } = useQuery({
    queryKey: ["weatherdata"],
    queryFn: getWeatherData,
  });
  return data;
};

export default useFetch;
