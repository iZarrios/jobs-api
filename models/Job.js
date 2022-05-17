import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company name'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'Please provide a position'],
        maxlength: 100,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
    },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;