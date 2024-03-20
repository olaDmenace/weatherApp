import React from "react";
import Lottie from "react-lottie";

const WeatherCard = ({ animationData, value, unit, description }) => {
  const animationsValue = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div>
        <Lottie options={animationsValue} height={100} width={100} />
      </div>
      <div>
        <h6
          className={
            value
              ? "text-gray-800 font-medium text-6xl md:text-4xl"
              : "animate-pulse text-gray-400 font-medium text-6xl md:text-4xl"
          }
        >
          {value ? value : "00..."}
          <span className="text-3xl md:text-xl">{unit}</span>
        </h6>
        <p className="text-blue-700 font-semibold text-lg">{description}</p>
      </div>
    </>
  );
};

export default WeatherCard;
