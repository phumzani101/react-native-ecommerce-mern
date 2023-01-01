import app from "./app.js";
import config from "./config/index.js";

app.listen(config.port, () => {
  console.log(`Server listening at http://locahost:${config.port}`);
});
