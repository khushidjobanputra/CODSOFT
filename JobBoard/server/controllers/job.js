import jobModel from "../models/jobModel";

export const createJob = async(req, res) => {

    try{
        const data = req.body;

        const job = await jobModel.create(data);
        console.log(job)

        res.status(201).json({message: "Job created successfully", job});
    }catch(error){
        console.log(error)
        res.status(409).json({message: "Error in creating job"})
    }
    
}

export const getJobs = async(req, res) =>{

    try{
        const jobs = await jobModel.find()

        res.status(200).json(jobs)
    }catch(error){
        console.log(error)
        res.status(404).json({message: "Error"})
    }
}

export const getJob = async(req, res) =>{
    const {id} = req.params

    try{
        const job = await jobModel.findById(id)

        res.status(200).json(job)
    }catch(error){
        console.log(error)
        res.status(404).json({message: "Error"})
    }
}

export const getBYCompanyId = async (req, res) => {
    try {
      const { companyId } = req.params;
  
      const jobPosts = await jobModel.find({ companyId });
      if (jobPosts.length === 0) {
        console.log("no jobs")
        return res.status(404).json({ message: 'No job posts found.' });
      }

      res.status(200).json(jobPosts);
    } catch (error) {
      console.log("Error");
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

export const getJobsBySearch = async (req, res) => {
    try {
      const { jobRole } = req.query;
  
      const jobPosts = await jobModel.find({ jobRole: { $regex: new RegExp(jobRole, 'i') } });

      res.status(200).json(jobPosts);
    } catch (error) {
      console.log("Error");
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

export const filterJobs = async (req, res) => {
  try {
    const { jobRoles, experienceLevels, locations, employmentTypes } = req.query;
    // console.log(jobRoles)
    // console.log(experienceRange)
    // console.log(locations)
    // console.log(employmentTypes)

    const filters = {}; 

    if (jobRoles) {
        filters.jobRole = { $regex: new RegExp(jobRoles, 'i') };
    }
  
    if (locations) {
        filters.locations = { $regex: new RegExp(locations, 'i') };
    }

    if (employmentTypes) {
        filters.employmentType = { $regex: new RegExp(employmentTypes, 'i') };
    }

    if (experienceLevels) {
        const [minExperience, maxExperience] = experienceLevels.split('-');
        filters.experience = {
          $gte: parseInt(minExperience, 10),
          $lte: parseInt(maxExperience, 10),
        };
    }

    // console.log(filters)

    const jobPosts = await jobModel.find(filters);

    res.status(200).json(jobPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteJob = async(req, res) =>{
    const {id} = req.params

    try{
        await jobModel.findByIdAndRemove(id)

        res.status(200).json({message: "Job deleted successfully"})
    }catch(error){
        console.log(error)
        res.status(404).json({message: "Error"})
    }
}

export const updateJob = async(req, res) =>{
    const {id: _id} = req.params
    const job = req.body

    try{
        const updatedJob = await jobModel.findByIdAndUpdate(_id, { ...job, _id }, { new: true })

        res.status(200).json({message: "Job updated successfully", updatedJob})
    }catch(error){
        console.log(error)
        res.status(404).json({message: "Error"})
    }
}