import Application from "../models/applicationModel"
import jobModel from "../models/jobModel";

export const getApplications = async(req, res) =>{

    try{
        const applications = await Application.find();

        res.status(200).json(applications)
    }catch(error){
        console.log(error);
    }
}

export const getApplication = async(req, res) =>{
    const {id} = req.params

    try{
        const application = await Application.findById(id)

        res.status(200).json(application)
    }catch(error){
        console.log(error)
        res.status(404).json({message: "Error"})
    }
}

export const updateApplication = async(req, res) =>{
    const {id: _id} = req.params
    const application = req.body

    try{
        const updatedApplication = await Application.findByIdAndUpdate(_id, { ...application, _id }, { new: true })

        res.status(200).json({message: "Application updated successfully", updatedApplication})
    }catch(error){
        console.log(error)
        res.status(404).json({message: "Error"})
    }
}


export const getUserApplication = async(req, res) =>{
    const {userId} = req.params

    try{
        const applications = await Application.find({ user: userId });

        res.status(200).json(applications)
    }catch(error){
        console.log(error)
        res.status(404).json({message: "Error"})
    }
}

export const getJobApplicants = async (req, res) => {
    try {
      const { companyId } = req.params;
  
      const applicants = await Application.find({ companyId });
  
      res.status(200).json(applicants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export const createApplication = async (req, res) => {
    try {   
      const data = req.body;
      const resumeFile = req.file;
      
      if (!resumeFile) {
        return res.status(400).json({ message: 'Resume file is missing' });
      }
  
      const applicationData = {
        ...data,
        resume: resumeFile.buffer,
      };
  
      const application = await Application.create(applicationData);
      console.log(application);
  
      res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.log(error);
      res.status(409).json({ message: 'Error in application' });
    }
};

export const applyToJob = async(req, res) =>{
    const { jobId } = req.body;
    console.log(jobId)

    try{
        const job = await jobModel.findById(jobId);
        
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        job.applicants.push(jobId);
        console.log("apdated job \n")
        console.log(job)
  
        await job.save();

        res.status(201).json({message: "Application submitted successfully"})
    }catch(error){
        console.log(error)
        res.status(409).json({message: "Error in application"})
    }
}