import { Button, Card, CardBody, Stack, Heading, Text, Image , Tabs, Tab, TabList, TabPanels, TabPanel, Flex, SimpleGrid, Box, Icon, HStack, Tag} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {FaLocationDot} from 'react-icons/fa6'
import {MdOutlineNotStarted, MdOutlineWorkOutline} from 'react-icons/md'
import {LiaMoneyBillSolid} from 'react-icons/lia'
import {RxLapTimer} from 'react-icons/rx'
import ApplicationForm from './ApplicationForm'
import axios from 'axios';
import { useAuth } from '../../context/authContext'

const CompanyDetail = ({id}) => {

    const [job, setJob] = useState(null);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/jobs/${id}`);
            setJob(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
        };

        fetchData();
    }, [id]);

return (
    <div>
        { job && (
        <Card borderRadius='15px'>
            <CardBody align='left' display='flex'>
                {/* <Image
                    src='https://cdn-icons-png.flaticon.com/512/2111/2111320.png'
                    alt='Profile Image'
                    borderRadius='full'
                    boxSize='100px'
                    mb={5}
                /> */}
                <Stack marginLeft={5} marginTop={5}>
                    <Heading size='lg'>{job.companyName}</Heading>
                    <Heading size='md'>{job.jobRole}</Heading>
                    <Tabs>
                        <TabList>
                            <Tab>Details</Tab>
                            <Tab>Application form</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                            
                            <Text as='b'> <Icon as={FaLocationDot}/>Locations</Text>
                            {
                                job.locations?.map((location)=>(
                                    <Text>{location}</Text>
                                ))
                            }

                            <SimpleGrid columns={[2,null,4]} spacing={10} mb={8} mt={5}>
                                <Box>
                                    <Text as='b'> <Icon as={MdOutlineNotStarted} mt={1}/> Start Date</Text>
                                    <Text>Immediately</Text>
                                </Box>
                                <Box>
                                    <Text as='b'> <Icon as={LiaMoneyBillSolid} mt={1}/> Salary</Text>
                                    <Text>{job.salary.min}-{job.salary.max}/Month</Text>
                                </Box>
                                <Box>
                                    <Text as='b'> <Icon as={MdOutlineWorkOutline} mt={1}/> Experience</Text>
                                    <Text>{job.experience} year</Text>
                                </Box>
                                <Box>
                                    <Text as='b'> <Icon as={RxLapTimer} mt={1}/> Application Deadline</Text>
                                    <Text>{job.applicationDeadline}</Text>
                                </Box>
                            </SimpleGrid>

                            <Heading size='md' mb={3}>Skills required</Heading>

                            <HStack mb={8} spacing={5}>
                                {
                                    job.skills?.map((skill)=>(
                                        <Tag size='lg' bgColor={'rgb(248,250,252)'} border="2px" borderColor="rgb(238,120,107)" mr={2} p={2}>
                                        {skill}
                                        </Tag>
                                    ))
                                }
                            </HStack>

                            <Heading size='md' mb={5}>About the Job</Heading>
                            <Text mb={8}>{job.description}</Text>

                            <Heading size='md' mb={2}>No. of openings</Heading>
                            <Text mb={5}>{job.numberOfOpenings}</Text>
                            {/* {
                                auth?.user?.role == 'Candidate' && <Button
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
                            } */}
                            </TabPanel>
                            <TabPanel>
                                {
                                    auth?.user?.role == 'Candidate' ? (
                                        <ApplicationForm id={id} />
                                    ) : (
                                        <Heading size='lg'>Application is only for Candidates.</Heading>
                                    )
                                }
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>
            </CardBody>
        </Card>
        )}
    </div>
  )
}

export default CompanyDetail