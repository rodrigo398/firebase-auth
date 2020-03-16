import React from "react";
import styled from "styled-components";

import useLocation from "#root/helpers/useLocation";

const Status = styled.div`
  background-color: white;
  color: ${props => (props.usingLocation ? "green" : "red")};
  font-weight: bold;
  padding: 0.125rem;
`;

const LocationStatus = () => {
  const location = useLocation();

  return (
    <Status usingLocation={!!location}>{location ? "Using current location" : "Not using current location"}</Status>
  );
};

export default LocationStatus;
