import express from "express";
import {
  createAccountController,
	deleteAccountController,
  loginController,
  verifyCredentialsController,
} from "./controllers";
import {VerifyCredentials} from "./middlewares/VerifyCredentials";

const AuthRouter = express.Router();

AuthRouter.post("/", (req, res) => createAccountController.execute(req, res));

AuthRouter.post("/login", (req, res) => loginController.execute(req, res));

AuthRouter.post("/verifyCredentials", (req, res) =>
  verifyCredentialsController.execute(req, res)
);

AuthRouter.delete("/",
	VerifyCredentials,
	(req, res) => deleteAccountController.execute(req, res)
);

export { AuthRouter };
