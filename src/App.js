import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";


const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [newCoordinate, setNewCoordinate] = useState({ lat: "", lon: "" });
  const ESP32_SERVER = "http://192.168.1.1/gps";  // Replace with ESP32's IP address

  const fetchCoordinates = async () => {
    try {
      const response = await fetch(`${ESP32_SERVER}`);
      if (!response.ok) throw new Error("Failed to fetch coordinates");
      const data = await response.json();
      // Object to table
      const newCoordinates = Array.isArray(data) ? data : [data];
      // Filter away faulty coordinates
      const validCoordinates = newCoordinates.filter(coord =>
        coord.latitude !== undefined && coord.longitude !== undefined
      );
      setCoordinates(validCoordinates);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const postCoordinates = async () => {
    try {
      const response = await fetch(`${ESP32_SERVER}/coordinates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoordinate),
      });

      if (response.ok) {
        fetchCoordinates();
        setNewCoordinate({ lat: "", lon: "" });
      } else {
        console.error("Error posting coordinates:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting coordinates:", error);
    }
  };

  useEffect(() => {
    fetchCoordinates();

    const interval = setInterval(() => {
      fetchCoordinates();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Leaflet Map App</h1>

      <div className="mb-4">
        <MapContainer center={[60.1699, 24.9384]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {coordinates.map((coord, index) => (
            <Marker key={index} position={[coord.latitude, coord.longitude]} icon={customIcon} />
          ))}
          <Polyline positions={coordinates.map((coord) => [coord.latitude, coord.longitude])} color="blue" />
        </MapContainer>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Add New Coordinate</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Latitude"
            className="p-2 border rounded"
            value={newCoordinate.lat}
            onChange={(e) => setNewCoordinate({ ...newCoordinate, lat: e.target.value })}
          />
          <input
            type="number"
            placeholder="Longitude"
            className="p-2 border rounded"
            value={newCoordinate.lon}
            onChange={(e) => setNewCoordinate({ ...newCoordinate, lon: e.target.value })}
          />
        </div>
        <button onClick={postCoordinates} className="p-2 bg-blue-500 text-white rounded">Submit Coordinate</button>
      </div>

      <div>
        <button onClick={fetchCoordinates} className="p-2 bg-gray-500 text-white rounded">Refresh Map</button>
      </div>
    </div>
  );
};

export default App;
