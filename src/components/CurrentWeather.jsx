import PropTypes from "prop-types";

import Clear from "../assets/backgrounImages/clear.jpg";
import Cloudy from "../assets/backgrounImages/cloudy.jpg";
import Rainy from "../assets/backgrounImages/rainy.jpg";
import Stormy from "../assets/backgrounImages/stormy.jpg";
import Sunny from "../assets/backgrounImages/sunny.jpg";

const CurrentWeather = ({ currentWeather }) => {
  // Ensure conditions are defined before proceeding
  const getBackgroundImage = (condition) => {
    if (!condition) return Sunny; // Default to sunny if condition is undefined or null

    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("clear")) {
      return Clear;
    } else if (conditionLower.includes("cloudy")) {
      return Cloudy;
    } else if (conditionLower.includes("rain")) {
      return Rainy;
    } else if (conditionLower.includes("storm")) {
      return Stormy;
    } else if (conditionLower.includes("sun")) {
      return Sunny;
    }
    return Sunny; // Default to sunny if no match
  };

  // Set the background image based on current weather conditions
  const backgroundImage = getBackgroundImage(currentWeather.conditions);

  return (
    <div
      className="flex flex-col items-center justify-center bg-cover bg-center rounded-lg p-6 flex-shrink-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-6xl font-bold text-white z-10">
        {currentWeather.temp}°C
      </h1>
      <p className="text-white text-lg z-10">{currentWeather.conditions}</p>
      <p className="text-white z-10">Rain: {currentWeather.precip}%</p>
    </div>
  );
};

CurrentWeather.propTypes = {
  currentWeather: PropTypes.shape({
    temp: PropTypes.number,
    conditions: PropTypes.string, // Ensure conditions are passed as a string
    precip: PropTypes.number,
  }),
};

export default CurrentWeather;
