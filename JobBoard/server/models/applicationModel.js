import mongoose from "mongoose";

const Application = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  linkedInProfile: {
    type: String
  }, 
  // resume: {
  //   type: String
  // }, 
  previousJobExperience: { 
    type: String, 
    required: true 
  },
  previousJobDescription: { 
    type: String, 
    required: true 
  },
  strength: { 
    type: String, 
    required: true 
  },
  weakness: { 
    type: String, 
    required: true 
  },
  objective: { 
    type: String, 
    required: true 
  },
  projectLinks: { 
    type: [String], 
    required: true 
  },
  githubProfile: { 
    type: String, 
    required: true 
  },
  companyId: { 
    type: String, 
    required: true 
  },
  jobId: {
    type: String,
    required: true
  },
  step: {
    type: 'string',
    enu: ['application', 'shortlisting', 'selected'],
    default: 'application'
  },
});

export default mongoose.model('Application', Application);
