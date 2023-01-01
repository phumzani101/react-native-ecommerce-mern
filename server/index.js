import app from "./app.js";
import config from "./config/index.js";

// connect to mongodb database
config.connectMongodb(config.mongoUrl);

app.listen(config.port, () => {
  console.log(`Server listening at http://locahost:${config.port}`);
});
