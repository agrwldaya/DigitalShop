"use client";

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const GeolocationPicker = ({ onLocationChange }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "0.375rem",
  };

  const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060, // Default to NYC
  };

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          onLocationChange?.(newLocation); // Send location to parent
          setError(null);
        },
        (err) => {
          setError("Unable to retrieve location");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  };

  const handleMapClick = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setLocation(newLocation);
    onLocationChange?.(newLocation);
  };

  return (
    <div className="space-y-2">
      <Label>Pin Location on Map</Label>
      <div className="border rounded-md h-48 bg-muted flex items-center justify-center">
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={15}
              center={location || defaultCenter}
              onClick={handleMapClick}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {location && <Marker position={location} />}
            </GoogleMap>
          </LoadScript>
        ) : (
          <p className="text-red-500 text-sm">Google Maps API key is missing.</p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!location && (
        <button
          onClick={handleGetCurrentLocation}
          className="mt-2 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Use Current Location
        </button>
      )}
    </div>
  );
};

const Label = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700">{children}</label>
);

export default GeolocationPicker;
