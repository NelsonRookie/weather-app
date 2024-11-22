import PropTypes from "prop-types";

import clear from "../assets/weatherCardImages/clear.png";
import cloud from "../assets/weatherCardImages/cloud.png";
import rain from "../assets/weatherCardImages/rainy.png";
import storm from "../assets/weatherCardImages/storm.png";
import sun from "../assets/weatherCardImages/sun.png";
import wind from "../assets/weatherCardImages/wind.png";

const Forecast = ({ forecast }) => {
  // Helper function to determine icon based on condition string
  const getWeatherIcon = (condition) => {
    if (!condition) return sun; // Default icon
    if (condition.toLowerCase().includes("cloud")) return cloud;
    if (condition.toLowerCase().includes("rain")) return rain;
    if (condition.toLowerCase().includes("clear")) return clear;
    if (condition.toLowerCase().includes("thunder")) return storm;
    if (condition.toLowerCase().includes("wind")) return wind;
    return sun; // Fallback
  };

  // Ensure forecast contains valid data
  const days = forecast?.values?.slice(0, 7) || [];

  return (
    <div className="rounded-lg p-6 mb-6">
      <h2 className="dark:text-dark-text text-xl font-bold mb-4">
        Week&apos;s Forecast
      </h2>
      <div className="grid grid-col-1 md:grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow"
          >
            <p className="text-sm font-semibold">
              {new Date(day.datetimeStr).toLocaleDateString("en", {
                weekday: "long",
              })}
            </p>
            <img
              src={getWeatherIcon(day.conditions)}
              alt={day.conditions || "Weather Icon"}
              className="w-10 h-10 my-2"
            />
            <p className="text-gray-600">{Math.round(day.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Forecast.propTypes = {
  forecast: PropTypes.shape({
    values: PropTypes.arrayOf(
      PropTypes.shape({
        datetimeStr: PropTypes.string.isRequired,
        temp: PropTypes.number.isRequired,
        conditions: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default Forecast;
