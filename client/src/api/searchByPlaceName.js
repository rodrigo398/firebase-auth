// passes through to the server, which then calls the Google Maps REST API - prevents cross origin

import axios from "axios";

const searchByPlaceName = async placeName => {
  const res = await axios.get(
    `${process.env.SERVICES_URI}/google-maps/autocomplete`,
    {
      params: {
        input: placeName
      }
    }
  );

  return res.data.predictions;
};

export default searchByPlaceName;
