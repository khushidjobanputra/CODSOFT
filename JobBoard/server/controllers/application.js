import multer from "multer";
import { uploadMiddleware } from "../middleware/upload";
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
      if (applicants.length === 0) {
        console.log("no applicants")
        return res.status(404).json({ message: 'No applicants found.' });
      }

      res.status(200).json(applicants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// export const createApplication = async (req, res) => {
//     try {   
//       const data = req.body;
  
//       const application = await Application.create(data);
//       console.log(application);
  
//       res.status(201).json({ message: 'Application submitted successfully' });
//     } catch (error) {
//       console.log(error);
//       res.status(409).json({ message: 'Error in application' });
//     }
// };

export const createApplication = async (req, res) => {
    try {
      // Handle file upload using Multer middleware
      uploadMiddleware(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred (e.g., file too large)
          console.error(err);
          return res.status(400).json({ message: 'File upload error' });
        } else if (err) {
          // An unknown error occurred
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        console.log(req.body)
        console.log(req.file)
        // Access uploaded file path
        const filePath = req.file ? req.file.filename : null;
        // console.log(filePath)
  
        // Application data from the request body
        const data = req.body;
        // data.resume = filePath;
  
        // Create a new application record with the file path
        // const application = await Application.create(data);
        const application = await Application.create({ ...data, resume: filePath });
  
        return res.status(201).json({ message: 'Application submitted successfully' });
      });
    } catch (error) {
      console.error(error);
      return res.status(409).json({ message: 'Error in application' });
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