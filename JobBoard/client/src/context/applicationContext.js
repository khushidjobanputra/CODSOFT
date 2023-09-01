import react, { createContext, useEffect, useState } from 'react'

const ApplicationContext = createContext();

const ApplicationProvider = ({children}) => {

    const [application, setApplication] = useState({});

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_API}/application`);
                setApplication(response.data);
            }catch(error){
                console.error('Error fetching application:', error);
            }
        }

        fetchData();
    }, [])
}