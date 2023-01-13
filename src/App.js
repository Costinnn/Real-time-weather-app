import { useEffect, useState } from "react";

import GetWeather from "./utils/GetWeather";

import GeneralInfo from "./components/GeneralInfo";
import HourTemp from "./components/HourTemp";
import DailyTemp from "./components/DailyTemp";
import Astro from "./components/Astro";

import { WEATHER_DATA } from "./WeatherData";

import "./App.scss";

// data to convert dates to weekdays in getDayName
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // Fetch and import data
  const importData = async (location) => {
    const data = await GetWeather(location);
    setWeatherData(data);
  };

  // Convert data to week names
  const getDayName = (date) => {
    const d = new Date(date);
    const dayName = days[d.getDay()];
    return dayName;
  };

  // Return weather info for hours after localtime
  const getHours = (arr, hour) => {
    const currentHour = hour.slice(-5);
    const hoursArr = arr.filter((item) => {
      if (item.time.slice(-5) >= currentHour) return item;
      return "";
    });
    return hoursArr;
  };

  const handleSearch = (e) => {
    // 1/2 realtime data
    e.preventDefault();
    importData(searchInput);
    setSearchInput("");
  };

  // fetch data for Bucharest city on app first mount
  useEffect(() => {
    // 2/2 realtime data
    importData("Bucuresti");

    // 1/1 ONLY FOR LOCAL TEST
    // setWeatherData(WEATHER_DATA);
  }, []);

  return (
    <div className="App">
      <section className="search-input">
        <form>
          <label>
            <input
              type="text"
              placeholder="Enter a city..."
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />
          </label>
          <button onClick={handleSearch}>Search</button>
        </form>
      </section>

      {weatherData && (
        <GeneralInfo
          cityName={weatherData.location.name}
          cityData={weatherData.current}
          iconNum={weatherData.current.condition.icon.slice(-7)}
        />
      )}
      {weatherData && (
        <HourTemp
          hoursData={getHours(
            weatherData.forecast.forecastday[0].hour,
            weatherData.location.localtime
          )}
        />
      )}
      {weatherData && (
        <DailyTemp
          dailyData={weatherData.forecast.forecastday}
          getDayName={getDayName}
        />
      )}
      {weatherData && (
        <Astro astroData={weatherData.forecast.forecastday[0].astro} />
      )}

      <p></p>
    </div>
  );
}

export default App;
