import { useEffect, useState } from "react";

import GetWeather from "./utils/GetWeather";

import GeneralInfo from "./components/GeneralInfo";
import HourTemp from "./components/HourTemp";

import { WEATHER_DATA } from "./WeatherData";

import "./App.scss";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const importData = async (location) => {
    const data = await GetWeather(location);
    setWeatherData(data);
    console.log(data);
    console.log(data.location.name);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    importData(searchInput);
    setSearchInput("");
  };

  useEffect(() => {
    importData("Bucuresti");
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
        />
      )}
      {weatherData && (
        <HourTemp hoursData={weatherData.forecast.forecastday[0].hour} />
      )}
    </div>
  );
}

export default App;
