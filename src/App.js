import { useEffect, useState } from "react";
import "./App.css";
import bgImage from "./images/weatherApp.jpg";
import { RiSearchLine } from "react-icons/ri";
import axios from "axios";
import { MdOutlineErrorOutline, MdCheckCircleOutline } from "react-icons/md";
import Lottie from "react-lottie";
import shinningSun from "./lotties/shinningSun.json";
import humidity from "./lotties/humidity.json";
import windSpeed from "./lotties/windSpeed.json";
import summary from "./lotties/summary.json";

function App() {
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError(
          "We can't access your current loacation. You can also use the address bar"
        );
      }
    };

    getLocation();
    console.log(longitude, latitude);
  });

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=58f3c2a761964e47d536ed1a11045c07`
        // `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid={418fa21518e8d3b4af1b607bce6deb3f}`
      );
      setResponse(res);
      console.log(res);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError(!error);
      }
      if (response) {
        setResponse(!response);
      }
    }, 5000);
  }, [error, response]);

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
          onClick={() => getWeather()}
        >
          Get Forecast
        </button>
        {error && (
          <p className="bg-red-400/30 min-h-10 text-lg px-2 py-3 flex items-center gap-3 content-center text-red-800 rounded-md transition ease-in-out duration-500">
            <MdOutlineErrorOutline className="min-h-8 min-w-8" />
            {error}
          </p>
        )}
        {response && (
          <p className="bg-green-400/30 min-h-10 text-lg px-2 py-3 flex items-center gap-3 content-center text-green-800 rounded-md transition ease-in-out duration-500">
            <MdCheckCircleOutline className="min-h-8 min-w-8" />
            {response}
          </p>
        )}
        <div className="w-full grid gap-4 md:grid-cols-3 md:grid-rows-2 lg:max-w-7xl">
          <div className="grid text-center justify-center content-start gap-4 rounded-md shadow-2xl h-fit md:h-full py-10 md:row-span-2 col-span-1">
            <Lottie
              options={animationsValue(shinningSun)}
              height={100}
              width={100}
            />
            <h6 className="text-gray-800 font-semibold text-6xl">
              25<sup className="">o</sup>C
            </h6>
            <p className="text-blue-700 font-semibold text-lg">Light Rain</p>
          </div>
          <div className="flex items-center justify-around relative rounded-md shadow-lg h-fit py-10 md:col-span-2">
            <div className="hidden">
              <Lottie
                options={animationsValue(summary)}
                height={100}
                width={100}
              />
            </div>
            <div>
              <h6 className="text-gray-800 font-medium text-2xl">Clear sky</h6>
            </div>
          </div>
          <div className="flex items-center justify-around relative rounded-md shadow-lg h-fit py-10 md:px-6">
            <div>
              <Lottie
                options={animationsValue(humidity)}
                height={100}
                width={100}
              />
            </div>
            <div>
              <h6 className="text-gray-800 font-medium text-6xl md:text-4xl">
                89<span className="text-3xl md:text-xl">%</span>
              </h6>
              <p className="text-blue-700 font-semibold text-lg">Humidity</p>
            </div>
          </div>
          <div className="flex items-center justify-around relative rounded-md shadow-lg h-fit py-10 md:px-6">
            <div>
              <Lottie
                options={animationsValue(windSpeed)}
                height={100}
                width={100}
              />
            </div>
            <div>
              <h6 className="text-gray-800 font-medium text-6xl md:text-4xl">
                1.87<span className="text-3xl md:text-xl">m/s</span>
              </h6>
              <p className="text-blue-700 font-semibold text-lg">Wind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
