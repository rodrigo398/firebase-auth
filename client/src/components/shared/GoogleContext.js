import GoogleMapsLoader from "google-maps";
import React, { createContext, useEffect, useState } from "react";

import Loader from "#root/components/shared/Loader";

const GoogleContext = createContext();

export default GoogleContext;

GoogleMapsLoader.KEY = process.env.GOOGLE_MAPS_API_KEY;
GoogleMapsLoader.LIBRARIES = ["places"];

export const GoogleProvider = ({ children }) => {
  const [google, setGoogle] = useState(null);

  useEffect(() => {
    let componentStillMounted = true;

    GoogleMapsLoader.load(google => {
      if (!componentStillMounted) return; // prevents error from unmount state update
      setGoogle(google);
    });

    return () => {
      componentStillMounted = false;
    };
  }, []);

  if (!google) return <Loader />;

  return (
    <GoogleContext.Provider value={{ google }}>
      {children}
    </GoogleContext.Provider>
  );
};
