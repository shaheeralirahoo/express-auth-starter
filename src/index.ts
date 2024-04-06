import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import { APP_RUNNER_MESSAGE } from "./shared/constants/app.constant";
import { unknownRouteHandler } from "./shared/function.shared";
import { errorHandler } from "./middlewares/error.middleware";
import { importRoutes } from "./utils/route.util";
import { logger } from "./utils/logger.util";
import { ENV } from "./utils/env.util";
import { db } from "./utils/db.util";
import cron from 'node-cron'
import { deleteManyIpAddress } from "./modules/users/users.service";

const cronExpression = '0 */60 * * * *';


const job = cron.schedule(cronExpression,deleteManyIpAddress, {scheduled:false})

job.start()
// const rateLimit = require('express-rate-limit');
const app = express();
const allRoutes = importRoutes();






app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

allRoutes.forEach((eachRoutes) => app.use("/api", eachRoutes));
// app.use("*",usersLimiter)
app.use("*", unknownRouteHandler);

function bootstrap() {
  db.$connect().then(() => logger.log(APP_RUNNER_MESSAGE));
}
app.use(errorHandler);
app.listen(ENV.PORT, bootstrap);
 