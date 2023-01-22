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
  const [error, setError] = useState(false);

  // Fetch and import data
  const importData = async (location) => {
    const data = await GetWeather(location);
    if (data !== "City not found") {
      setWeatherData(data);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Convert data to week names
  const getDayName = (date) => {
    const d = new Date(date);
    const dayName = days[d.getDay()];
    return dayName;
  };

  // Return weather info for hours after localtime
  const getHours = (todayArr, tomorrowArr, hour) => {
    let count = 0;
    const currentHour = hour.slice(-5);

    const todayHoursArr = todayArr.filter((item) => {
      if (item.time.slice(-5) >= currentHour) {
        count++;
        return item;
      }
      return "";
    });

    const tmrwHoursArr = tomorrowArr.filter((item) => {
      while (count < 24 && item.time.slice(-5) < currentHour) {
        count++;
        return item;
      }
      return "";
    });
    if (count === 24) {
      count = 0;
      return todayHoursArr.concat(tmrwHoursArr);
    }
  };

  // 2/2 for fetching
  const handleSearch = (e) => {
    // 1/2 realtime data
    e.preventDefault();
    importData(searchInput);
    setSearchInput("");
  };

  // 1/2 fetch data for Bucharest city on app first mount
  useEffect(() => {
    // 2/2 realtime data
    importData("Bucuresti");

    // 1/1 ONLY FOR LOCAL TEST
    //  setWeatherData(WEATHER_DATA);
  }, []);

  return (
    <div className="App">
      {/* Search input */}
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
          {error && <p>City not found, try again!</p>}
          <button onClick={handleSearch}>Search</button>
        </form>
      </section>

      {/* Actual location temperature */}
      {weatherData && (
        <GeneralInfo
          cityName={weatherData.location.name}
          cityData={weatherData.current}
          iconNum={weatherData.current.condition.icon.slice(-7)}
        />
      )}

      {/* Hourly temperatures */}
      {weatherData && (
        <HourTemp
          hoursData={getHours(
            weatherData.forecast.forecastday[0].hour,
            weatherData.forecast.forecastday[1].hour,
            weatherData.location.localtime
          )}
        />
      )}

      {/* Daily temperature */}
      {weatherData && (
        <DailyTemp
          dailyData={weatherData.forecast.forecastday}
          getDayName={getDayName}
        />
      )}

      {/* Sunise / sunset */}
      {weatherData && (
        <Astro astroData={weatherData.forecast.forecastday[0].astro} />
      )}

      <p></p>
    </div>
  );
}

export default App;
