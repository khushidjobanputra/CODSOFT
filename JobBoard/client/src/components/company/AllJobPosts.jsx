import { Card, CardBody, CardFooter, Divider, Box, Image, Heading, Text, Button, Icon, Tag, Grid } from '@chakra-ui/react'
import React from 'react'
import {BsBookmarkDashFill} from 'react-icons/bs'
import {AiOutlineDollar} from 'react-icons/ai'
import {HiMiniUserGroup} from 'react-icons/hi2'
import {useNavigate} from 'react-router-dom'

const AllJobPosts = () => {

    const navigate = useNavigate();

    const handleClick=()=>{
        navigate('/CompanyDetails')
    }
  return (
    <div>
        <Card p={4} borderRadius='15px' marginBottom='5'>
            <CardBody>
                <Box display='flex' justifyContent='space-between'>
                    <Box display='flex'>
                        <Box bgColor={'rgb(248,250,252)'} height='40px' width='40px' align='center' mr={3}>
                            <Image src='https://cdn-icons-png.flaticon.com/512/2111/2111320.png' height='30px' width='30px'/>
                        </Box>
                        <Box mb={2}>
                            <Heading size='sm'>Junior react developer</Heading>
                            <Text color='#CCD2D7'>Airbnb - Fulltime</Text>
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
                    <Text color='#CCD2D7'>We are looking forward for talented designer to help us create beautiful and functional interface for company. Your role requires you to understand user very well.</Text>
                </Box>
                <Grid display='flex' spacing='30px' mt={2}>
                    <Tag bgColor={'rgb(248,250,252)'} p={2}>Design</Tag>
                    <Tag bgColor={'rgb(248,250,252)'} p={2}>Fulltime</Tag>
                    <Tag bgColor={'rgb(248,250,252)'} p={2}>Remote</Tag>
                </Grid>
            </CardBody>
            <Divider />
            <CardFooter>
                <Box display='flex' justifyContent='space-between'>
                    <Box  mr={8}>
                        <Icon as={AiOutlineDollar}/> $12-$14k/Month
                    </Box>
                    <Box  mr={8}>
                        <Icon as={HiMiniUserGroup}/> 4 openings
                    </Box>
                    <Button
                    variant={'solid'}
                    bgColor= 'rgb(238,120,107)'
                    color= 'white'
                    size={'md'}
                    width='10rem'
                    p={2}
                    onClick={handleClick}
                    >
                    View Applicants
                    </Button>
                </Box>
            </CardFooter>
        </Card>
    </div>
  )
}

export default AllJobPosts