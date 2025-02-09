
# ESP32 GPS Tracker with React and Leaflet

This project implements a GPS tracker using an ESP32-S3 microcontroller and a NEO-6M GPS module. 
It was developed as part of my thesis. 
The ESP32 acts as a Wi-Fi-enabled server that shares GPS data in JSON format. 
A React-based frontend using the Leaflet library visualizes the GPS location on a map, 
accessible from devices on the same network.

### `The project is divided into two repositories:`
[ESP32 code](https://github.com/johannajes/GPS_ESP32).
[Map application code](https://github.com/johannajes/Map_App).

---

# Dependencies to install before running program
npm install react@latest react-dom@latest \
npm install leaflet react-leaflet \
npm install web-vitals

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More about React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

