// hook-based implementation of Google context for ease of use

import { useContext } from "react";

import GoogleContext from "#root/components/shared/GoogleContext";

const useGoogleMaps = () => {
  return useContext(GoogleContext);
};

export default useGoogleMaps;
