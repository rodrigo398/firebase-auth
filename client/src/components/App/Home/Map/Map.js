import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import useGoogleMaps from "#root/helpers/useGoogleMaps";
import useLocation from "#root/helpers/useLocation";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const PRETTY_ZOOMED_IN = 16;

const Map = props => {
  const { google } = useGoogleMaps();
  const directionsServiceRef = useRef(new google.maps.DirectionsService());
  const directionsRendererRef = useRef(new google.maps.DirectionsRenderer());
  const elRef = useRef();
  const mapRef = useRef();
  const location = useLocation();

  const setToSydney = () => {
    mapRef.current.setCenter(new google.maps.LatLng(-33.867, 151.195));
  };

  const setToCurrentLocation = () => {
    mapRef.current.setCenter(
      new google.maps.LatLng(location.latitude, location.longitude)
    );
  };

  const resetToOriginal = () => {
    directionsRendererRef.current.setMap(null);
    mapRef.current.setZoom(PRETTY_ZOOMED_IN);

    if (location) {
      setToCurrentLocation();
    } else {
      setToSydney();
    }
  };

  useEffect(() => {
    mapRef.current = new google.maps.Map(elRef.current, {
      zoom: PRETTY_ZOOMED_IN
    });

    setToSydney();
  }, []);

  useEffect(() => {
    // if they enabled their location, we'll re-centre the map to be on them
    if (!location) return;

    setToCurrentLocation();
  }, [location]);

  useEffect(() => {
    if (!props.placeId) {
      resetToOriginal();
      return;
    }

    if (location) {
      // have the user's current location? show direction
      directionsRendererRef.current.setMap(mapRef.current);

      directionsServiceRef.current.route(
        {
          origin: new google.maps.LatLng(location.latitude, location.longitude),
          destination: { placeId: props.placeId },
          travelMode: "DRIVING"
        },
        (result, status) => {
          if (status === "OK") {
            directionsRendererRef.current.setDirections(result);
          }
        }
      );
    } else {
      // if not, just show the selected place
      const service = new google.maps.places.PlacesService(mapRef.current);
      service.getDetails(
        {
          placeId: props.placeId,
          fields: ["geometry"]
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            mapRef.current.setCenter(place.geometry.location);
            new google.maps.Marker({
              position: place.geometry.location,
              map: mapRef.current
            });
          }
        }
      );
    }
  }, [props.placeId]);

  return <Wrapper ref={elRef}></Wrapper>;
};

export default Map;
