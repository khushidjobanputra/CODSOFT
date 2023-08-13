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