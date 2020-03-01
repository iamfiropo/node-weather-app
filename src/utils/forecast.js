const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/456b29700e60a681c4b3d5d2a0bf7503/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      const { temperature, precipProbability } = body.currently;
      const { summary } = body.daily.data[0];
      if (error) {
        callback("Unable to connect to weather service!");
      } else if (body.error) {
        callback("Unable to find location");
      } else {
        callback(
          undefined,
          `${summary} It is currently ${temperature} degree out. There is a ${precipProbability}% chance of rain`
        );
      }
    }
  );
};

module.exports = forecast;
