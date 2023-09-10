import express from 'express'
import { applyToJob, createApplication, getApplication, getApplications, getJobApplicants, getUserApplication, updateApplication } from '../controllers/application';
import { isAuthenticated, isCandidate, isEmployer, uploadResume } from '../middleware/auth';

const router = express.Router();

router.post('/create', isAuthenticated, uploadResume, createApplication);
// router.post('/create', isAuthenticated, isCandidate, createApplication)
// router.post('/create/:jobId', isAuthenticated, isCandidate, applyToJob)
router.get('/', isAuthenticated, getApplications)
router.get('/:id', isAuthenticated, isEmployer, getApplication)
router.get('/user/:userId', isAuthenticated, getUserApplication)
router.get('/job/:jobId', isAuthenticated, isEmployer, getJobApplicants);
router.patch('/update/:id', isAuthenticated, isEmployer, updateApplication)

export default router