import express from 'express'
import { createJob, deleteJob, getJob, getJobs, updateJob } from '../controllers/job';
import {isAuthenticated} from '../middleware/auth'

const router = express.Router();

router.get('/', getJobs)
router.get('/:id', getJob)
router.post('/create', isAuthenticated, createJob)
router.delete('/delete/:id', isAuthenticated, deleteJob)
router.patch('/update/:id', isAuthenticated, updateJob)

export default router