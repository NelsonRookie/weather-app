import { FaWind, FaSun, FaTint, FaCloudSun, FaCloudMoon } from "react-icons/fa";
import PropTypes from "prop-types";

const AdditionalInfoCard = ({ cityData }) => {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold mb-4">Weather Highlights</h3>
      {/* Grid container with responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* Humidity */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-100">
          <div className="flex md:flex-col items-center gap-2 p-1">
            <FaTint className="text-blue-500" size={25} />
            <p>
              <strong>Humidity:</strong>
            </p>
            <p>{cityData.humidity}%</p>
          </div>
        </div>

        {/* UV Index */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-100">
          <div className="flex md:flex-col items-center gap-2 p-1">
            <FaSun className="text-yellow-500" size={25} />
            <p>
              <strong>UV Index:</strong>
            </p>
            <p>{cityData.uvindex}</p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-100">
          <div className="flex md:flex-col items-center gap-2 p-1">
            <FaWind className="text-gray-500" size={25} />
            <p>
              <strong>Wind Speed:</strong>
            </p>
            <p>{cityData.wspd}km/h</p>
          </div>
        </div>

        {/* Sunrise */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-100">
          <div className="flex md:flex-col items-center gap-2 p-1">
            <FaCloudSun className="text-orange-500" size={25} />
            <p>
              <strong>Sunrise:</strong>{" "}
            </p>
            <p>
              {new Date(cityData.sunrise).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Sunset */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-100">
          <div className="flex md:flex-col items-center gap-2 p-1">
            <FaCloudMoon className="text-indigo-500" size={25} />
            <p>
              <strong>Sunset:</strong>{" "}
            </p>
            <p>
              {new Date(cityData.sunset).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

AdditionalInfoCard.propTypes = {
  cityData: PropTypes.shape({
    humidity: PropTypes.number.isRequired,
    uvindex: PropTypes.number.isRequired,
    wspd: PropTypes.number.isRequired,
    sunrise: PropTypes.string.isRequired,
    sunset: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdditionalInfoCard;
