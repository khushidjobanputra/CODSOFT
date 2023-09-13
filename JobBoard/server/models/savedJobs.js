import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'jobModel' },
});

export default mongoose.model('SavedJob', savedJobSchema);
