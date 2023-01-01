import app from "./app.js";
import config from "./config/index.js";
import { globalErrors } from "./src/v1/middlewares/errorMiddleware.js";

// connect to mongodb database
config.connectMongodb(config.mongoUrl);

app.use(globalErrors);

app.listen(config.port, () => {
  console.log(`Server listening at http://locahost:${config.port}`);
});
