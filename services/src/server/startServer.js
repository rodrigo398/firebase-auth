import accessEnv from "#root/helpers/accessEnv";

import app from "./app";

const PORT = accessEnv("PORT", 5000);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
