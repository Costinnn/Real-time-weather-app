const GetWeather = async (location) => {
  const API_KEY = "c1acd22bc69a4aa49b085806231101";

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=no&alerts=no`
    );
    console.log(response);
    const weatherData = await response.json();
    if (response) {
      return weatherData;
    }
    if (!response) {
      throw new Error("Could not fetch the data");
    }
  } catch (err) {
    console.log("ERROR: " + err.message);
  }

  return "Data not found";
};

export default GetWeather;
