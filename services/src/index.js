require("dotenv").config();
require("@babel/register")({
  presets: ["@babel/preset-env"]
});
require("@babel/polyfill");

require("./firebase/setup");
require("./server/startServer");
