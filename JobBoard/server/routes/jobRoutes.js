import express from 'express'
import {createJob, deleteJob, filterJobs, getBYCompanyId, getJob, getJobs, getJobsBySearch, updateJob } from '../controllers/job';
import {isAuthenticated, isEmployer} from '../middleware/auth'

const router = express.Router();

router.get('/', getJobs)
router.get('/companyId/:companyId', isAuthenticated, getBYCompanyId)
router.get('/search', isAuthenticated, getJobsBySearch)
router.get('/filters', isAuthenticated, filterJobs)
router.get('/:id', getJob)
router.post('/create', isAuthenticated, isEmployer, createJob)
router.delete('/delete/:id', isAuthenticated, deleteJob)
router.patch('/update/:id', isAuthenticated, updateJob)

export default router 