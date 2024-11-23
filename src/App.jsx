import { useEffect, useState } from "react";
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecasts";
import AdditionalInfoCard from "./components/AdditionalCardInfo";
import CitySelector from "./components/CitySelector";
import SearchCity from "./components/Search";

import dotenv from "dotenv";
dotenv.config();

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("selectedCity") || "Malabon, PH"
  );
  const [showForecast, setShowForecast] = useState(false);

  const cities = [
    "Caloocan, PH",
    "Las Piñas, PH",
    "Makati, PH",
    "Malabon, PH",
    "Mandaluyong, PH",
    "Manila, PH",
    "Marikina, PH",
    "Muntinlupa, PH",
    "Navotas, PH",
    "Parañaque, PH",
    "Pasay, PH",
    "Pasig, PH",
    "Quezon City, PH",
    "San Juan, PH",
    "Taguig, PH",
    "Valenzuela, PH",
    "Pateros, PH",
  ];

  const fetchWeatherData = async () => {
    setLoading(true);
    const newWeatherData = {};
    try {
      for (const city of cities) {
        const response = await axios.get(
          "https://visual-crossing-weather.p.rapidapi.com/forecast",
          {
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_APP_KEY,
              "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
            },
            params: {
              location: city,
              aggregateHours: "24",
              contentType: "json",
              unitGroup: "metric",
              shortColumnNames: "false",
            },
          }
        );
        newWeatherData[city] = response.data.locations[city];
      }
      setWeatherData(newWeatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGeolocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            "https://visual-crossing-weather.p.rapidapi.com/forecast",
            {
              headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_APP_KEY,
                "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
              },
              params: {
                location: `${latitude},${longitude}`,
                aggregateHours: "24",
                contentType: "json",
                unitGroup: "metric",
                shortColumnNames: "false",
              },
            }
          );

          const locationName = response.data.resolvedAddress;
          const matchedCity = cities.find((city) =>
            locationName.toLowerCase().includes(city.toLowerCase())
          );

          if (matchedCity) {
            setSelectedCity(matchedCity);
          } else {
            alert("Could not match your location to a Metro Manila city.");
          }
        } catch (error) {
          console.error("Error fetching geolocation data:", error);
        }
      },
      (error) => {
        alert("Unable to retrieve your location.");
        console.error(error);
      }
    );
  };

  useEffect(() => {
    fetchWeatherData();
    getGeolocation();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  const handleSearch = () => {
    if (!filter.trim()) {
      alert("Please enter a search term.");
      return;
    }

    const filteredCity = cities.find((city) =>
      city.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredCity) {
      setSelectedCity(filteredCity);
      setFilter(""); // Reset search input
    } else {
      alert("City not found in Metro Manila.");
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setShowForecast(false);
  };

  const toggleForecast = () => setShowForecast((prev) => !prev);

  const cityData = weatherData[selectedCity]?.currentConditions || {};
  const forecastData = weatherData[selectedCity]?.values || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Metro Manila Weather App
        </h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <CitySelector
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
          <SearchCity
            filter={filter}
            setFilter={setFilter}
            handleSearch={handleSearch}
          />
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">{selectedCity}</h2>
          {cityData.temp ? (
            <>
              <CurrentWeather currentWeather={cityData} />
              <div className="mt-6 grid grid-cols-1 ">
                <AdditionalInfoCard cityData={cityData} />
              </div>
              <button
                onClick={toggleForecast}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                {showForecast ? "Hide Forecast" : "Show Forecast"}
              </button>
              {showForecast && (
                <div className="mt-4">
                  <Forecast forecast={{ values: forecastData }} />
                </div>
              )}
            </>
          ) : (
            <p>No data available for {selectedCity}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
