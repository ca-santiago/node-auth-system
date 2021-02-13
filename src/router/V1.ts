import { Router } from "express";
import { AuthRouter } from "../modules/auth/infra/router";

const RouterV1 = Router();

RouterV1.use(AuthRouter);

export default RouterV1;
