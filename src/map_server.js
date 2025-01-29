import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "<button>";

// Custom icon for Leaflet markers
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [newCoordinate, setNewCoordinate] = useState({ lat: "", lon: "" });

  // Fetch coordinates from a local server
  const fetchCoordinates = async () => {
    try {
      const response = await fetch("http://localhost:5000/coordinates");
      const data = await response.json();
      setCoordinates(data);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  // Post new coordinates to the server
  const postCoordinates = async () => {
    try {
      const response = await fetch("http://localhost:5000/coordinates", {
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
            <Marker key={index} position={[coord.lat, coord.lon]} icon={customIcon} />
          ))}
          <Polyline positions={coordinates.map((coord) => [coord.lat, coord.lon])} color="blue" />
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
        <Button onClick={postCoordinates}>Submit Coordinate</Button>
      </div>

      <div>
        <Button onClick={fetchCoordinates}>Refresh Map</Button>
      </div>
    </div>
  );
};

export default App;
