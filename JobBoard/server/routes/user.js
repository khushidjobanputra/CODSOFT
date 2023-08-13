import express from "express";
import { signin, signup, userProfile } from '../controllers/user';
import {isAuthenticated} from '../middleware/auth'

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', isAuthenticated , userProfile);

export default router