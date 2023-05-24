import express from 'express';
import AuthController from '../controller/authController.js';

const router = express.Router();

router
  .post("/auth/login", AuthController.login)

export default router;   