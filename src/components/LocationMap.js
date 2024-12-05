import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const LocationMap = () => {
  const [usersLocation, setUsersLocation] = useState([]);

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/locations');
        setUsersLocation(response.data);
      } catch (error) {
        console.error('Error fetching user locations:', error);
      }
    };

    fetchUserLocations();

    const socket = new WebSocket('ws://localhost:5000/locations');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setUsersLocation(data);
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {usersLocation.map((user, index) => (
          <Marker key={index} position={[user.latitude, user.longitude]}>
            <Popup>
              <h3>User Location</h3>
              <p>{`Latitude: ${user.latitude}, Longitude: ${user.longitude}`}</p>
              <Tooltip direction="top" offset={[-8, -2]} opacity={1} permanent>
                {user.name}
              </Tooltip>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationMap;
