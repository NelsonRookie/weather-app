import PropTypes from "prop-types";

const CitySelector = ({ cities, selectedCity, onCityChange }) => {
  return (
    <div>
      <label className="block font-bold mb-2">Select Your City:</label>
      <select
        value={selectedCity}
        onChange={onCityChange}
        className="w-full p-2 border rounded-lg"
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

CitySelector.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired, // An array of strings representing city names
  selectedCity: PropTypes.string.isRequired, // A string representing the currently selected city
  onCityChange: PropTypes.func.isRequired, // A function to handle city selection change
};

export default CitySelector;
