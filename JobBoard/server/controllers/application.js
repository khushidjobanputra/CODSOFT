import Application from "../models/applicationModel"

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

export const createApplication = async(req, res) =>{

    try{
        const data = req.body;

        const application = await Application.create(data);
        console.log(application)

        res.status(201).json({message: "Application submitted successfully"})
    }catch(error){
        console.log(error)
        res.status(409).json({message: "Error in application"})
    }
}