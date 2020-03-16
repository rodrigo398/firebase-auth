import _ from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import searchByPlaceName from "#root/api/searchByPlaceName";

const Places = styled.li`
  color: #8c8c8c;
  list-style-type: none;
  padding: 0.5rem;

  :hover {
    background-color: rgba(0, 0, 0, 0.06);
    color: #000000;
    cursor: pointer;
  }
`;

const MAXIMUM_RUN_RATE = 250;

const throttledSearchByPlaceName = _.throttle(
  searchByPlaceName,
  MAXIMUM_RUN_RATE
);

const PlaceSuggestions = ({ getItemProps, inputValue }) => {
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    (async () => {
      setPredictions(await throttledSearchByPlaceName(inputValue));
    })();
  }, [inputValue]);

  return predictions
    ? predictions.map((prediction, index) => {
        return (
          <Places
            {...getItemProps({
              index,
              item: prediction,
              key: prediction.id
            })}
          >
            {prediction.description}
          </Places>
        );
      })
    : null;
};

export default PlaceSuggestions;
