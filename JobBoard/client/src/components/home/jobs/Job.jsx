import { Card, CardBody, CardFooter, Divider, Box, Image, Heading, Text, Button, Icon, Tag, Grid, SimpleGrid, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {BsBookmarkDashFill} from 'react-icons/bs'
import {AiOutlineDollar} from 'react-icons/ai'
import {HiMiniUserGroup} from 'react-icons/hi2'
import {useLocation, useNavigate} from 'react-router-dom'
import { useJobContext } from '../../../context/jobContext'
import { RxLapTimer } from 'react-icons/rx'
import axios from 'axios'
import { useAuth } from '../../../context/authContext'

const Job = ({searchResults}) => {
    
    // console.log(searchResults)
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const Alljobs = useJobContext();
    const userDataString = localStorage.getItem('auth');
    const userData = JSON.parse(userDataString);
    const authToken = userData.token;
    const [auth, setAuth] = useAuth()
    let jobs;

    const handleClick=(jobId)=>{
        const companyDetailsURL = `/companyDetails/${jobId}`;

        navigate(companyDetailsURL);
    }

    if(searchResults){
        jobs = searchResults;
    }
    else{
        jobs = Alljobs;
    }

    const saveJob = async (userId, jobId) => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API}/saveJob/create`, { userId, jobId },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`, // Include user's authentication token
              },
            }
          );
          console.log(response)
      
          if (response.status === 201) {
            toast({
                title: `Job saved successfully`,
                position: 'top-right',
                status: 'success',
                isClosable: true,
            })
          }
          else{
            toast({
                title: `Error in saving job`,
                position: 'top-right',
                status: 'error',
                isClosable: true,
            })
          }
        } catch (error) {  
          console.error('Error saving job:', error);
        }
    };
      

    // const getDate = ({timestamp})=>{
    //     const date = new Date(timestamp);
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //     const day = date.getDate().toString().padStart(2, '0');

    //     const formattedDate = `${year}-${month}-${day}`;

    //     return formattedDate
    // }

  return (
    <div>
        <SimpleGrid columns={[2, null, 2]} spacing='25px' mt={5}>
        {
            jobs?.map((job)=>(
                <Card p={2} borderRadius='15px' marginBottom='5' key={job.id}>
                    <CardBody>
                        <Box display='flex' justifyContent='space-between'>
                            <Box display='flex'>
                                {/* <Box bgColor={'rgb(248,250,252)'} height='40px' width='40px' align='center' mr={3}>
                                    <Image src='https://cdn-icons-png.flaticon.com/512/2111/2111320.png' height='30px' width='30px'/>
                                </Box> */}
                                <Box mb={2}>
                                    <Heading size='md'>{job.jobRole}</Heading>
                                    <Text color='#CCD2D7'>{job.companyName} - {job.employmentType}</Text>
                                </Box>
                            </Box>
                            <Button
                                bgColor={'rgb(248,250,252)'}
                                color={'#2A9FB9'}
                                mb={5}
                                onClick={() => saveJob(auth?.user?._id,job._id)}
                            >
                                Save Job
                                <Icon as={BsBookmarkDashFill} ml={2}/>
                            </Button>
                        </Box>
                        <Box>
                            <Text color='#CCD2D7'>{job.description.slice(0,150)}<a href="/companyDetails">read more...</a></Text>
                        </Box>
                        <Grid display='flex' spacing='30px' mt={2}>
                            {
                                job.skills.map((skill)=>(
                                    <Tag bgColor={'rgb(248,250,252)'} p={2} border="2px" borderColor="rgb(238,120,107)" mr={2}>{skill}</Tag>
                                ))
                            }  
                        </Grid>
                        <Grid display='flex' spacing='30px' mt={2}>
                            {
                                job.locations.map((skill)=>(
                                    <Tag bgColor={'rgb(248,250,252)'} p={2} border="2px" borderColor="rgb(238,120,107)" mr={2}>{skill}</Tag>
                                ))
                            }  
                        </Grid>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Box display='flex' justifyContent='space-between'>
                            <Box  mr={4}>
                                <Icon as={AiOutlineDollar}/> {job.salary.min}-{job.salary.max}/Month
                            </Box>
                            <Box  mr={4}>
                                <Icon as={HiMiniUserGroup}/> {job.numberOfOpenings} openings
                            </Box>
                            <Box  mr={3}>
                                <Icon as={RxLapTimer}/> {job.applicationDeadline}
                                {/* <Icon as={HiMiniUserGroup}/> {getDate(job.applicationDeadline)} */}
                            </Box>
                            <Button
                            variant={'solid'}
                            bgColor= 'rgb(238,120,107)'
                            color= 'white'
                            size={'md'}
                            width='10rem'
                            p={2}
                            onClick={() => handleClick(job._id)} 
                            sx={{'_hover': {backgroundColor: '#E2E8F0', color: '#2A9FB9'}}}
                            >
                            {auth?.user?.role == 'Candidate' ? 'Apply' : 'View Details'}
                            </Button>
                        </Box>
                    </CardFooter>
                </Card>
            ))
        }
        </SimpleGrid>
    </div>
  )
}

export default Job