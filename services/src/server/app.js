import cors from "cors";
import express from "express";

import routes from "./routes";

const app = express();

// standard CORS configuration that allows all origins
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired"
    ],
    optionsSuccessStatus: 200
  })
);

routes(app);

export default app; // for testing in server/routes/__tests__
