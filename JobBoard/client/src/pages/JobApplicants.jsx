import { SimpleGrid , Box, Flex, Grid, Card, Heading, Text, Icon} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Profile from '../components/home/profile/Profile';
import AllJobPosts from '../components/company/AllJobPosts';
import {AiOutlineDollar} from 'react-icons/ai'
import {HiMiniUserGroup} from 'react-icons/hi2'
import ListOfApplicants from '../components/company/ListOfApplicants';
import { useAuth } from '../context/authContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const JobApplicants = () => {

  const [auth, setAuth] = useAuth();
  const heading = auth?.user?.userName;
  const subHeading = auth?.user?.role;
  const buttonLabel = 'View all job posts'

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const companyName = searchParams.get('companyName');
  const jobId = searchParams.get('jobId');

  const userDataString = localStorage.getItem('auth');
  const userData = JSON.parse(userDataString);
  const authToken = userData.token;

  const [jobPost, setJobPosts] = useState(null)
  const [applicants, setApplicants] = useState([])

  useEffect(()=>{

    const fetchData = async()=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API}/jobs/${jobId}`)
            setJobPosts(response.data)
        }catch(error){
            console.log(error);
        }
    }
    fetchData()
  },[jobId])

    useEffect(()=>{
      const fetchData2 = async()=>{
          try{
              const response = await axios.get(`${process.env.REACT_APP_API}/application/job/${jobId}`, {
                method: 'GET',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${authToken}`
                },
              })
              console.log(response)
              setApplicants(response);
          }catch(error){
              console.log(error);
          } 
      }
      fetchData2()
    },[jobId])
    

  return (
    <Box bgColor={'rgb(248,250,252)'} p={5} display='flex' spacing='10px'> 
      <Grid gap={10} display='flex' flexDirection='row'>
        <Box width={'20vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <Profile heading={heading} subHeading={subHeading} buttonLabel={buttonLabel}/>
              <Card p={4} borderRadius='15px'>
                <Heading size='md' as='b' mb={4} color='rgb(238,120,107)'>{jobPost?.jobRole}</Heading>
                <Box display='flex' flexDirection='column'>
                    <Box  mb={4}>
                        <Icon as={AiOutlineDollar}/> {jobPost?.salary?.min}-{jobPost?.salary?.max}/Month
                    </Box>
                    <Box  mb={4}>
                        <Icon as={HiMiniUserGroup}/> {jobPost?.numberOfOpenings} openings
                    </Box>
                </Box>
                {/* <Heading size='sm'>23 Applicants</Heading>   */}
              </Card>
            </SimpleGrid>
          </Flex>
        </Box>
        <Box width={'70vw'}>
            <Flex flexDirection='column'>
                <SimpleGrid columns={[1, null, 1]} spacing='15px'>
                  <ListOfApplicants applicants={applicants}/>
                </SimpleGrid>
            </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default JobApplicants;