import express from 'express';
import {
  createAccountController,
  loginController,
  verifyCredentialsController
} from './controllers';

const AuthRouter = express.Router();

AuthRouter.post('/', (req, res) => createAccountController.execute(req, res));

AuthRouter.post('/login', (req, res) => loginController.execute(req, res));

AuthRouter.post('/verifyCredentials', (req, res) => verifyCredentialsController.execute(req, res));

export {
	AuthRouter
} 

