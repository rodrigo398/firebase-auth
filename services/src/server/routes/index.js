import api from "./api";
import googleMaps from "./googleMaps";

export default app => {
  app.use("/api", api);
  app.use("/google-maps", googleMaps);
};
