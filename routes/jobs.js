import express from 'express';
import {
    getAllJobs,
    getJob,
    deleteJob,
    updateJob,
    createJob,
} from '../controllers/jobs.js';

const router = express.Router();

router.route('/').get(getAllJobs).post(createJob);

router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

export default router;