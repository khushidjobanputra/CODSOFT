import express from 'express'
import { createJob, deleteJob, getJob, getJobs, updateJob } from '../controllers/job';
import {isAuthenticated, isEmployer} from '../middleware/auth'

const router = express.Router();

router.get('/', getJobs)
router.get('/:id', getJob)
router.post('/create', isAuthenticated, isEmployer, createJob)
router.delete('/delete/:id', isAuthenticated, deleteJob)
router.patch('/update/:id', isAuthenticated, updateJob)

export default router