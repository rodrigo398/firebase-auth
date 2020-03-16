// hook for getting the user's lat and lng

import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let componentStillMounted = true;

    "geolocation" in navigator &&
      navigator.geolocation.getCurrentPosition(position => {
        if (!componentStillMounted) return;

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });

    return () => {
      componentStillMounted = false;
    };
  }, []);

  return location;
};

export default useLocation;
