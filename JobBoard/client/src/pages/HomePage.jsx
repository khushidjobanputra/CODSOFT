import { SimpleGrid , Box, Flex, Grid, Button} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Profile from '../components/home/profile/Profile';
import WorkExperience from '../components/home/profile/WorkExperience';
import Skills from '../components/home/profile/Skills';
import Search from '../components/home/jobs/Search';
import Job from '../components/home/jobs/Job';
import ExperienceLevel from '../components/home/filters/ExperienceLevel';
import Location from '../components/home/filters/Location';
import JobType from '../components/home/filters/JobType';
import JobRole from '../components/home/filters/JobRole';
import { useAuth } from '../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/searchContext';
import axios from 'axios';
import Info from '../components/home/profile/Info';

const HomePage = () => {
  const [auth, setAuth] = useAuth()
  const {searchResults, searchTerm } = useSearch(); 

  const userDataString = localStorage.getItem('auth');
  const userData = JSON.parse(userDataString);
  const authToken = userData.token;

  const heading = auth?.user?.userName;
  const subHeading = auth?.user?.role;
  const buttonLabel = 'View Profile'

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobRole = queryParams.get('jobRole');
  const [jobPosts, setJobPosts] = useState([]);
  
  const navigate = useNavigate(); 

  // State to keep track of selected filters
  const [selectedJobRoles, setSelectedJobRoles] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    setSelectedJobRoles(queryParams.getAll('jobRoles'));
    setSelectedJobTypes(queryParams.getAll('employmentTypes'));
    setSelectedLocations(queryParams.getAll('locations'));
    setSelectedExperienceLevels(queryParams.getAll('experienceLevels'));
  }, [location]);


  const handleApplyFilters = async() => {

    const queryParams = new URLSearchParams();
    selectedJobRoles.forEach((role) => queryParams.append('jobRoles', role));
    selectedJobTypes.forEach((type) => queryParams.append('employmentTypes', type));
    selectedLocations.forEach((location) => queryParams.append('locations', location));
    selectedExperienceLevels.forEach((level) => queryParams.append('experienceLevels', level));

    const response = await axios.get(`${process.env.REACT_APP_API}/jobs/filters?${queryParams.toString()}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${authToken}`
      },
    })

    if(response.status == 200){
      setJobPosts(response.data);
      console.log(searchResults.length);
      console.log(jobPosts);
      console.log(jobPosts.length)
      console.log("Successfull");
    }else{
      console.log("Error")
    }
  }


  return (
    <Box bgColor={'rgb(248,250,252)'} p={5} display='flex' spacing='10px'> 
      <Grid gap={10} display='flex' flexDirection='row'>
        <Box width={'20vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <Profile heading={heading} subHeading={subHeading} buttonLabel={buttonLabel}/>
              {
                auth?.user?.role == 'user'? (
                  <>
                    {/* <WorkExperience /> */}
                    <Skills />
                  </>
                ): (
                  <></>
                )
              }
              <Button
              variant={'solid'}
              bgColor= 'rgb(238,120,107)'
              color= 'white'
              size={'md'}
              p={2}
              onClick={() => handleApplyFilters()} 
              sx={{'_hover': {backgroundColor: '#E2E8F0', color: '#2A9FB9'}}}
              >
              Apply Filters
              </Button>
              <ExperienceLevel />
              <Location />
              <JobRole />
              <JobType />
            </SimpleGrid>
          </Flex>
        </Box>
        <Box width={'72vw'}>
          <Flex flexDirection='column'>
            <Search/>
              {
                jobPosts.length > 0 ? (<Job searchResults={jobPosts} />): (
                  <>
                    {
                      jobRole ? (<Job searchResults={searchResults}/>) : (<Job />)
                    }
                  </>
                )
              }
          </Flex>
        </Box>
        {/* <Box width={'16vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
            <Button
              variant={'solid'}
              bgColor= 'rgb(238,120,107)'
              color= 'white'
              size={'md'}
              p={2}
              onClick={() => handleApplyFilters()} 
              sx={{'_hover': {backgroundColor: '#E2E8F0', color: '#2A9FB9'}}}
              >
              Apply Filters
              </Button>
              <ExperienceLevel />
              <Location />
              <JobRole />
              <JobType />
            </SimpleGrid>
          </Flex>
        </Box> */}
      </Grid>
    </Box>
  );
};

export default HomePage;