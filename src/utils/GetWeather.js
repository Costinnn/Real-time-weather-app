const GetWeather = async (location) => {
  const API_KEY = "c1acd22bc69a4aa49b085806231101";

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
