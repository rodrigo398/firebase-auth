import axios from "axios";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";

const GOOGLE_MAPS_API_KEY = accessEnv("GOOGLE_MAPS_API_KEY");

const router = express.Router();

router.get("/autocomplete", async (req, res) => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json",
    {
      params: {
        key: GOOGLE_MAPS_API_KEY,
        input: req.query.input
      }
    }
  );

  return res.json(response.data);
});

export default router;
