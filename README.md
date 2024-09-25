# SmartThings SmartApp -- Ambient Weather Statioin Integration
The purpose of this repo is to provide an updated implementation for accessing data from your local Ambient Weather Station (AWS) on the SmartThings platform.
This was done in the past using a SmartThings SmartApp that was built with groovy, but that has since been deprecated. SmartThings now utilizes a [Node.js SDK](https://github.com/SmartThingsCommunity/smartapp-sdk-nodejs) for developing SmartApps for their platform

## Preliminiary Research
- An API Keys need to be created on the Ambient Weather Network (AWN) before being able to access the Ambient Weather API
  - `applicationKey`
  - `apiKey`
- The [Ambient Weather API](https://ambientweather.docs.apiary.io/#reference/0/device-data) ([python](https://github.com/avryhof/ambient_api), [node.js](https://github.com/owise1/ambient-weather-api)) allows for REST calls through [Websockets](https://socket.io/)
- "Create a SmartApp" inside of the SmartThings Developers Workspace, some examples and tutorials to look into:
  - [Simple SmartApp Tutorial (SmartApp SDK)](https://community.smartthings.com/t/simple-smartapp-tutorial-smartapp-sdk/194664) (specifically the video)
  - [Set the color of a light based on the weather](https://github.com/SmartThingsCommunity/weather-color-light-smartapp-nodejs)
  
### Project Log
- [X] Repo Refactor: update readme, move `unsupported` to new `smartthings` folder

#### Potential Setbacks
- [ambientweather.net](https://ambientweather.net/) fails to load at points
- [glitch.com](glitch.com) fails to load at points
- Web-hosting fees depending on the size/service calls of the SmartApp