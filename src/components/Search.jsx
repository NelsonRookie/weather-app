import PropTypes from "prop-types";

const SearchCity = ({ filter, setFilter, handleSearch }) => {
  return (
    <div>
      <label className="block font-bold mb-2">Search City:</label>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for places..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

SearchCity.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchCity;
