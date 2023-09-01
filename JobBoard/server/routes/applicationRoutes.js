import express from 'express'
import { createApplication, getApplication, getApplications, getJobApplicants } from '../controllers/application';
import { isAuthenticated, isCandidate, isEmployer } from '../middleware/auth';

const router = express.Router();

router.post('/create', isAuthenticated, isCandidate, createApplication)
router.get('/', isAuthenticated, isEmployer, getApplications)
router.get('/:id', isAuthenticated, isEmployer, getApplication)
router.get('/job/:companyId', isAuthenticated, isEmployer, getJobApplicants);

export default router