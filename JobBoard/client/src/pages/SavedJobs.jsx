import React, { useEffect, useState } from 'react'
import { SimpleGrid , Box, Flex, Grid, Button, Heading} from '@chakra-ui/react';
import { Card, CardBody, CardFooter, Divider, Image, Text, Icon, Tag } from '@chakra-ui/react'
import ExperienceLevel from '../components/home/filters/ExperienceLevel';
import Location from '../components/home/filters/Location';
import JobRole from '../components/home/filters/JobRole';
import JobType from '../components/home/filters/JobType';
import { useAuth } from '../context/authContext';
import Profile from '../components/home/profile/Profile';
import Skills from '../components/home/profile/Skills';
import axios from 'axios';
import Job from '../components/home/jobs/Job';
import { AiOutlineDollar } from 'react-icons/ai';
import { HiMiniUserGroup } from 'react-icons/hi2';

const SavedJobs = () => {
    const userDataString = localStorage.getItem('auth');
    const userData = JSON.parse(userDataString);
    const authToken = userData.token;
    const [auth, setAuth] = useAuth();
    const [savedJobs, setSavedJobs] = useState([])
  
    const heading = auth?.user?.userName;
    const subHeading = auth?.user?.role;
    const buttonLabel = 'View Profile'
    

    useEffect(()=>{

        const getSavedJobs = async()=>{
            try{
                const savedJobsResponse = await axios.get(`${process.env.REACT_APP_API}/saveJob/getAll/${auth?.user?._id}`,{
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${authToken}`
                    }
                })

                // console.log(savedJobsResponse.data[0].jobId)
                if (savedJobsResponse.status === 200) {
                    const allSavedJobs = savedJobsResponse.data;
                    const accumulatedJobData = [];
            
                    // Iterate through saved jobs to fetch job details
                    for (const savedJob of allSavedJobs) {
                      const jobId = savedJob.jobId;
            
                      // Fetch job details using jobId
                      const jobResponse = await axios.get(`${process.env.REACT_APP_API}/jobs/${jobId}`,
                        {
                          method: 'GET',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                          }
                        }
                      );
                      if (jobResponse.status === 200) {
                        const jobData = jobResponse.data;
                        accumulatedJobData.push(jobData);
                      }
                    }
                    console.log(accumulatedJobData);
                    setSavedJobs(accumulatedJobData);
                }
            }catch(error){
                console.log(error)
            }
        }

        getSavedJobs()
    }, [authToken, auth?.user?._id])

  return (
    <Box bgColor={'rgb(248,250,252)'} height='100vh' p={5} display='flex' spacing='10px'>
        <Grid gap={10} display='flex' flexDirection='row'>
            <Box width={'20vw'}>
            <Flex flexDirection='column'>
                <SimpleGrid columns={[1, null, 1]} spacing='15px'>
                <Profile heading={heading} subHeading={subHeading} buttonLabel={buttonLabel}/>
                {
                    auth?.user?.role == 'Candidate'? (
                    <>
                        {/* <WorkExperience /> */}
                        <Skills />
                    </>
                    ): (
                    <></>
                    )
                }
                </SimpleGrid>
            </Flex>
            </Box>
            <Box width={'72vw'}>
            <Flex flexDirection='column'>
                <Heading size='lg'>Saved Jobs</Heading>
                {
                    savedJobs.length == 0 && (<Heading size='md' mt={5} color='gray.700'>No saved Jobs</Heading>)
                }
                {
                    savedJobs?.map((jobPost)=>(
                        <>
                            <Card p={4} borderRadius='15px' marginBottom='5'>
                                <CardBody>
                                    <Box display='flex' justifyContent='space-between'>
                                        <Box display='flex'>
                                            {/* <Box bgColor={'rgb(248,250,252)'} height='40px' width='40px' align='center' mr={3}>
                                                <Image src='https://cdn-icons-png.flaticon.com/512/2111/2111320.png' height='30px' width='30px'/>
                                            </Box> */}
                                            <Box mb={2}>
                                                <Heading size='sm'>{jobPost.jobRole}</Heading>
                                                <Text color='#CCD2D7'>{jobPost.companyName} - {jobPost.employmentType}</Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text color='#CCD2D7'>{jobPost.description}</Text>
                                    </Box>
                                    <Grid display='flex' spacing='30px' mt={2}>
                                        {
                                            jobPost.skills.map((skill)=>(
                                                <Tag bgColor={'rgb(248,250,252)'} border="2px" borderColor="rgb(238,120,107)" mr={2} p={2}>{skill}</Tag>
                                            ))
                                        }
                                    </Grid>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <Box display='flex' justifyContent='space-between'>
                                        <Box  mr={8}>
                                            <Icon as={AiOutlineDollar}/> {jobPost.salary.min}-{jobPost.salary.max}/Month
                                        </Box>
                                        <Box  mr={8}>
                                            <Icon as={HiMiniUserGroup}/> {jobPost.numberOfOpenings} openings
                                        </Box>
                                        <Button
                                        variant={'solid'}
                                        bgColor= 'rgb(238,120,107)'
                                        color= 'white'
                                        size={'md'}
                                        width='10rem'
                                        p={2}
                                        sx={{'_hover': {backgroundColor: '#E2E8F0', color: '#2A9FB9'}}}
                                        >
                                        Apply
                                        </Button>
                                    </Box>
                                </CardFooter>
                            </Card>
                        </>
                    ))
                }
            </Flex>
            </Box>
        </Grid>
    </Box>
  )
}

export default SavedJobs