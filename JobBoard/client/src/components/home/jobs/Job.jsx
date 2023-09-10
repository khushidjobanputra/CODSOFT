import { Card, CardBody, CardFooter, Divider, Box, Image, Heading, Text, Button, Icon, Tag, Grid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {BsBookmarkDashFill} from 'react-icons/bs'
import {AiOutlineDollar} from 'react-icons/ai'
import {HiMiniUserGroup} from 'react-icons/hi2'
import {useLocation, useNavigate} from 'react-router-dom'
import { useJobContext } from '../../../context/jobContext'

const Job = ({searchResults}) => {
    
    // console.log(searchResults)
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const Alljobs = useJobContext();
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
        {
            jobs?.map((job)=>(
                <Card p={4} borderRadius='15px' marginBottom='5' key={job.id}>
                    <CardBody>
                        <Box display='flex' justifyContent='space-between'>
                            <Box display='flex'>
                                <Box bgColor={'rgb(248,250,252)'} height='40px' width='40px' align='center' mr={3}>
                                    <Image src='https://cdn-icons-png.flaticon.com/512/2111/2111320.png' height='30px' width='30px'/>
                                </Box>
                                <Box mb={2}>
                                    <Heading size='sm'>{job.jobRole}</Heading>
                                    <Text color='#CCD2D7'>{job.companyName} - {job.employmentType}</Text>
                                </Box>
                            </Box>
                            <Button
                                bgColor={'rgb(248,250,252)'}
                                color={'#2A9FB9'}
                                mb={5}
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
                                    <Tag bgColor={'rgb(248,250,252)'} p={2}>{skill}</Tag>
                                ))
                            }  
                        </Grid>
                        <Grid display='flex' spacing='30px' mt={2}>
                            {
                                job.locations.map((skill)=>(
                                    <Tag bgColor={'rgb(248,250,252)'} p={2}>{skill}</Tag>
                                ))
                            }  
                        </Grid>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Box display='flex' justifyContent='space-between'>
                            <Box  mr={8}>
                                <Icon as={AiOutlineDollar}/> {job.salary.min}-{job.salary.max}/Month
                            </Box>
                            <Box  mr={8}>
                                <Icon as={HiMiniUserGroup}/> {job.numberOfOpenings} openings
                            </Box>
                            <Box  mr={8}>
                                <Icon as={HiMiniUserGroup}/> {job.applicationDeadline}
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
                            >
                            Apply
                            </Button>
                        </Box>
                    </CardFooter>
                </Card>
            ))
        }
    </div>
  )
}

export default Job