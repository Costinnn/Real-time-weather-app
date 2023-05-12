const GetWeather = async (location) => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=no&alerts=no`
    );
    const weatherData = await response.json();
    if (response.ok) {
      return weatherData;
    }
    if (!response.ok) {
      throw new Error("Could not fetch the data");
    }
  } catch (err) {
    console.log("ERROR: " + err.message);
  }

  return "City not found";
};

export default GetWeather;
