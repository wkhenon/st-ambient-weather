# SmartThings SmartApp - Ambient Weather Statioin Integration
The purpose of this repo is to provide an updated implementation for accessing data from your local Ambient Weather Station (AWS) on the SmartThings platform.
This was done in the past using a SmartThings SmartApp that was built with groovy, but that has since been deprecated. SmartThings now utilizes a [Node.js SDK](https://github.com/SmartThingsCommunity/smartapp-sdk-nodejs) for developing SmartApps for their platform

## Preliminary Research
- An API Keys need to be created on the Ambient Weather Network (AWN) before being able to access the Ambient Weather API
  - `applicationKey`
  - `apiKey`
- The [Ambient Weather API](https://ambientweather.docs.apiary.io/#reference/0/device-data) ([python](https://github.com/avryhof/ambient_api), [node.js](https://github.com/owise1/ambient-weather-api)) allows for REST calls through [Websockets](https://socket.io/)
- "Create a SmartApp" inside of the SmartThings Developers Workspace, some examples and tutorials to look into:
  - [Simple SmartApp Tutorial (SmartApp SDK)](https://community.smartthings.com/t/simple-smartapp-tutorial-smartapp-sdk/194664) (specifically the video)
  - [Set the color of a light based on the weather](https://github.com/SmartThingsCommunity/weather-color-light-smartapp-nodejs)

## Node.js Server - Simple App Set-up
- The scope of this project will initially be *local testing* so `Node.js`, `ngrok`, and `npm` will be needed as dependencies
  ```
  sudo apt install nodejs npm
  snap install ngrok
  ```
  - The following `npm` packages need to be installed:
    ```
    npm install express
    npm install dotenv
    ```
- `server.js`: This is where the SmartApp will be created for the platform; for now it just starts a simple app with the Express framework. 
  - The `ambient-weather-api/ambient-api` and `SmartThings SmartApp Node.js SDK` will need to be imported in.
- Run the server: `node server.js`
- The app can be exposed to a public URL using ngrok: `ngrok http 3000`
  - A `ngrok` account is needed for this step (it's free!)
  - The app needs to be running for public URL access through ngrok

## SmartThings SmartApp Creation
- Following the steps provided in [Create a SmartApp](https://developer.smartthings.com/docs/connected-services/create-a-smartapp).
  - ["Services with a Complex App"](https://developer.smartthings.com/docs/connected-services/create-a-smartapp#services-with-a-complex-smartapp) will be needed since we want to reach out to transmit/receive data from Ambient Weather.
- Need to have the app running with the public URL
- SmartThings Developer Workspace -> Create a New Project -> Automation for the SmartThings App
- Project Name: "Ambient Weather"
- Select "Register App" -> Webhook Endpoint
- There is a requirement by the SmartThings SmartApp to handle a confirmation request from SmartThings by issuing a HTTP GET request to confirmationURL:

  <p align="center">
    <img src="images/smartapp-confirmation-request.png" />
  </p>
  
- The current implemenation for the SmartApp is returning a `404` whenever SmartThings attempts to verify it with this request:

  <p align="center">
    <img src="images/confirmation-request-error.png" />
  </p>

- This is due to how barebones the implementation is now, but it lets us know that we're in a position to start developing the actual implementation for the SmartApp!

### Project Log
- [X] Repo Refactor: update readme, move `unsupported` to new `smartthings` folder
- [X] Added readme to `unsupported` directory
- [X] Initial Simple App set-up with local server for testing/development
- [X] SmartThings SmartApp creation on the Developer Workspace
- [ ] `ambient-api` Integration: locally serve weather data at the endpoint

#### Potential Setbacks
- [ambientweather.net](https://ambientweather.net/) fails to load at points
- [glitch.com](glitch.com) fails to load at points
- Web-hosting fees depending on the size/service calls of the SmartApp
- `ngrok` generates a random URL everytime the server is started; this could potentially be fixed by following [these steps](https://ngrok.com/blog-post/free-static-domains-ngrok-users).
