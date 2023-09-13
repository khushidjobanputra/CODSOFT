import savedJobs from "../models/savedJobs"

export const saveJob = async(req, res)=>{

    try{
        const data = req.body;

        const response = await savedJobs.create(data)

        res.status(201).json({message: "Job saved successfully", response});
    }catch(error){
        console.log(error)
        res.status(404).json({message: "something went wrong", job});
    }
}

export const getSavedJobs = async(req, res) => {

    const {userId} = req.params;

    try{
        const jobs = await savedJobs.find({userId})

        res.status(200).json(jobs)
    }catch(error){
        console.log(error)
        res.status(404).json({message: "Error"})
    }
}