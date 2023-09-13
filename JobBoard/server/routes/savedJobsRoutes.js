import express from 'express'
import { isAuthenticated } from '../middleware/auth';
import { getSavedJobs, saveJob } from '../controllers/saveJob';

const router = express.Router();

router.post('/create',isAuthenticated, saveJob)
router.get('/getAll/:userId',isAuthenticated, getSavedJobs)

export default router