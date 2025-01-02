const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config()
const AmbientWeatherApi = require('ambient-weather-api')

const api = new AmbientWeatherApi({
    apiKey: process.env.AMBIENT_WEATHER_API_KEY || 'Put your AW apiKey here',
    applicationKey: process.env.AMBIENT_WEATHER_APPLICATION_KEY || 'Put your AW applicationKey here'
})

app.get('/', async (req, res) => {
  try {
      api.connect();

      api.on('connect', () => {
          console.log('Connected to Ambient Weather API.');
      });

      api.userDevices()
        .then((devices) => {
          if (devices.length === 0) {
            console.log('No devices found for this API key.');
          } else {
            console.log('Devices:', devices);
          }
        })
      .catch((err) => {
        console.error('Error fetching devices:', err);
      });
      
      const devices = await api.userDevices();
      let response = 'Ambient Weather Devices:<br>';

      for (const device of devices) {
        api.deviceData(device.macAddress, { limit: 5 })
          .then((data) => {
            if (data.length === 0) {
              console.log('No recent data available for this device.');
            } else {
              console.log('Recent Data:', data);
            }
          })
        .catch((err) => {
          console.error('Error fetching device data:', err);
        });

          const deviceData = await api.deviceData(device.macAddress, { limit: 5 });

          response += `<b>${device.info.name} (${device.info.coords.location})</b><br>`;
          if (deviceData.length > 0) {
              deviceData.forEach((data) => {
                response += `Date: ${new Date(data.dateutc).toLocaleString()}, Temp: ${data.tempf}°F<br>`;
              });
          } else {
            response += 'No recent data available.<br>';
          }
          response += '<br>';
      }

      res.send(response);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Failed to fetch weather data.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});