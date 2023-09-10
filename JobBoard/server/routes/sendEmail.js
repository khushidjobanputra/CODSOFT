import express from "express";
import {isAuthenticated} from '../middleware/auth'
import { sendEmail } from "../controllers/mail";

const router = express.Router();

router.post('/sendEmail',isAuthenticated, sendEmail);

export default router