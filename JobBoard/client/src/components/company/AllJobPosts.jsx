import { Card, CardBody, CardFooter, Divider, Box, Image, Heading, Text, Button, Icon, Tag, Grid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {BsBookmarkDashFill} from 'react-icons/bs'
import {AiOutlineDollar} from 'react-icons/ai'
import {HiMiniUserGroup} from 'react-icons/hi2'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const AllJobPosts = ({id}) => {

    const navigate = useNavigate();
    const [jobPosts, setJobPosts] = useState([]);

    // const handleClick=()=>{
    //     navigate(`/jobApplicants`)
    // }
    const handleClick=(companyName, id)=>{
        const url = `/jobApplicants?companyName=${companyName}&jobId=${id}`;
        navigate(url)
    }

    // console.log(id)

    useEffect(()=>{

        const fetchData = async()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_API}/jobs?companyId=${id}`)
                setJobPosts(response.data)
            }catch(error){
                console.log(error);
            }
        }
        fetchData()
        // console.log(jobPosts)
    },[id])

  return (
    <div>
        {
            jobPosts.map((jobPost)=>(
                <>
                    <Card p={4} borderRadius='15px' marginBottom='5'>
                        <CardBody>
                            <Box display='flex' justifyContent='space-between'>
                                <Box display='flex'>
                                    <Box bgColor={'rgb(248,250,252)'} height='40px' width='40px' align='center' mr={3}>
                                        <Image src='https://cdn-icons-png.flaticon.com/512/2111/2111320.png' height='30px' width='30px'/>
                                    </Box>
                                    <Box mb={2}>
                                        <Heading size='sm'>{jobPost.jobRole}</Heading>
                                        <Text color='#CCD2D7'>{jobPost.companyName} - {jobPost.employmentType}</Text>
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
                                <Text color='#CCD2D7'>{jobPost.description}</Text>
                            </Box>
                            <Grid display='flex' spacing='30px' mt={2}>
                                {
                                    jobPost.skills.map((skill)=>(
                                        <Tag bgColor={'rgb(248,250,252)'} p={2}>{skill}</Tag>
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
                                // onClick={handleClick}
                                onClick={() =>handleClick(jobPost.companyName, jobPost._id)}
                                >
                                View Applicants
                                </Button>
                            </Box>
                        </CardFooter>
                    </Card>
                </>
            ))
        }
    </div>
  )
}

export default AllJobPosts