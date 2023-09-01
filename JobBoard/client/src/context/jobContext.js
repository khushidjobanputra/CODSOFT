import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const JobContext = createContext();

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <JobContext.Provider value={jobs}>
        {children}
    </JobContext.Provider>
  );
};

const useJobContext = () => {
  return useContext(JobContext);
};

export { JobProvider, useJobContext };
