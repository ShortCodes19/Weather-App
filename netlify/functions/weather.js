exports.handler = async function (event, context) {
  const { city } = event.queryStringParameters;
  const apiKey = process.env.API_KEY;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (response.status !== 200) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: data.message || 'Error fetching weather data' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch weather data" }),
    };
  }
};