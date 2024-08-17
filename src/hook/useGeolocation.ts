"use client";

import { useState, useEffect } from "react";

interface ILocation {
  longitude: number;
  latitude: number;
}

export const useGeoLocation = (options = {}) => {
  const [location, setLocation] = useState<ILocation>();
  const [error, setError] = useState("");

  const handleSuccess = (pos: GeolocationPosition) => {
    const { longitude, latitude } = pos.coords;

    setLocation({
      longitude,
      latitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};
