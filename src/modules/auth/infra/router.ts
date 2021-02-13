import express from 'express';
import { createAccountController } from './controllers';

const AuthRouter = express.Router();

AuthRouter.post('/', (req, res) => createAccountController.execute(req, res));

export {
	AuthRouter
} 

