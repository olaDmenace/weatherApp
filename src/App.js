import { useEffect, useState } from "react";
import "./App.css";
import bgImage from "./images/weatherApp.jpg";
import { RiSearchLine } from "react-icons/ri";
import axios from "axios";
import { MdCheckCircleOutline, MdOutlineErrorOutline } from "react-icons/md";
import Lottie from "react-lottie";
import shinningSun from "./lotties/shinningSun.json";
import humidity from "./lotties/humidity.json";
import windSpeed from "./lotties/windSpeed.json";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!navigator.geolocation) {
          setError(
            "We can't access your current location. You can also use the address bar"
          );
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            const res = await axios.get(
              `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=afed90d4031a483fab64c7bac37b1e2a`
            );
            setResponse(res?.data?.data);
          },
          (error) => {
            setError(error.message);
          }
        );
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setError("API rate limit exceeded. Please try again later.");
        } else {
          setError("Failed to fetch weather data");
        }
      }
    };

    fetchWeatherData();
  }, []);

  const fetchData = async (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi",
      params: {
        address: `${address}`,
      },
      headers: {
        "X-RapidAPI-Key": "b94b0e76fcmsh4a2462e9795f720p13b532jsn9e5a1f267e93",
        "X-RapidAPI-Host": "address-from-to-latitude-longitude.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);

      // Extract longitude and latitude from the response
      const longitude = response?.data?.Results[0]?.longitude;
      const latitude = response?.data?.Results[0]?.latitude;

      // Make the second request using the extracted longitude and latitude
      const weatherResponse = await axios.get(
        `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=afed90d4031a483fab64c7bac37b1e2a`
      );
      console.log(weatherResponse.data);
      setSuccess("Weather for requested location updated");
      setResponse(weatherResponse?.data?.data);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setError("API rate limit exceeded. Please try again later.");
      } else {
        setError("Failed to fetch weather data");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError(!error);
      }
      if (success) {
        setSuccess(!success);
      }
    }, 5000);
  }, [error, success]);

  const animationsValue = (arg) => {
    return {
      loop: true,
      autoplay: true,
      animationData: arg,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  };

  return (
    <div className="h-screen w-full">
      <div className="h-1/3 w-full relative bg-blue-900">
        <img
          src={bgImage}
          alt="weatherApp"
          className="h-full w-screen object-cover absolute mix-blend-overlay"
        />
        <div className="text-white relative px-10 pt-16 md:pt-[20%] lg:pt-[8%] space-y-4 lg:max-w-7xl">
          <h2 className="font-bold text-3xl">Cloudy with a Chance of Lols</h2>
          <p>Weather updates and forecast with a delightful experience. </p>
        </div>
      </div>
      <div className="px-4 py-10 grid gap-5 md:w-10/12 mx-auto lg:max-w-7xl">
        {/* <form className="grid gap-5"> */}
        <label htmlFor="city" className="relative">
          <input
            type="text"
            id="search"
            name="search"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter City"
            className="border border-blue-700 bg-transparent placeholder:text-blue-700 rounded-md h-12 w-full px-3 pr-10 ring-0 outline-blue-500 dark:outline-none text-blue-700"
          />
          <RiSearchLine className="absolute top-2 right-2 h-8 w-8 p-1 text-blue-800 cursor-pointer" />
        </label>
        <button
          className="bg-blue-700 rounded-md text-white h-12 hover:bg-blue-500 transition ease-in-out duration-500"
          onClick={() => fetchData()}
        >
          Get Forecast
        </button>
        {/* </form> */}
        {error && (
          <p className="bg-red-400/30 min-h-10 text-lg px-2 py-3 flex items-center gap-3 content-center text-red-800 rounded-md transition ease-in-out duration-500">
            <MdOutlineErrorOutline className="min-h-8 min-w-8" />
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-400/30 min-h-10 text-lg px-2 py-3 flex items-center gap-3 content-center text-green-800 rounded-md transition ease-in-out duration-500">
            <MdCheckCircleOutline className="min-h-8 min-w-8" />
            {success}
          </p>
        )}
        <div className="w-full grid gap-4 md:grid-cols-3 md:grid-rows-2 lg:max-w-7xl">
          <div className="grid text-center justify-center content-start gap-4 rounded-md shadow-2xl h-fit md:h-full py-10 md:row-span-2 col-span-1">
            <Lottie
              options={animationsValue(shinningSun)}
              height={100}
              width={100}
            />
            <h6
              className={
                response
                  ? "text-gray-800 font-semibold text-6xl"
                  : "animate-pulse text-gray-400 font-medium text-6xl"
              }
            >
              {response?.[0]?.app_temp}
              <sup className="">o</sup>C
            </h6>
            <p className="text-blue-700 font-semibold text-lg">Temperature</p>
          </div>
          <div className="flex items-center justify-around relative rounded-md shadow-lg h-fit py-10 md:col-span-2">
            <div>
              <h6
                className={
                  response
                    ? "text-gray-800 font-medium text-2xl"
                    : "animate-pulse text-gray-400 font-medium text-6xl md:text-2xl"
                }
              >
                {response?.[0]?.weather?.description}
              </h6>
            </div>
          </div>
          <div className="flex items-center justify-around relative rounded-md shadow-lg h-fit py-10 md:px-6">
            <WeatherCard
              animationData={humidity}
              value={response?.[0]?.rh}
              unit="%"
              description="Humidity"
            />
          </div>
          <div className="flex items-center justify-around relative rounded-md shadow-lg h-fit py-10 md:px-6">
            <WeatherCard
              animationData={windSpeed}
              value={response?.[0]?.wind_spd}
              unit="m/s"
              description="Wind"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
