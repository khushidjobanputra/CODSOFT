import { Button, Card, CardBody, Stack, Heading, Text, Image , Tabs, Tab, TabList, TabPanels, TabPanel, Flex, SimpleGrid, Box, Icon, HStack, Tag} from '@chakra-ui/react'
import React from 'react'
import {FaLocationDot} from 'react-icons/fa6'
import {MdOutlineNotStarted, MdOutlineWorkOutline} from 'react-icons/md'
import {LiaMoneyBillSolid} from 'react-icons/lia'
import {RxLapTimer} from 'react-icons/rx'

const CompanyDetail = () => {

    const Tags = ['design', 'creative thinking', 'Digital Marketing', 'react', 'mongodb', 'nodejs', 'javascript']
  return (
    <div>
        <Card borderRadius='15px'>
            <CardBody align='left' display='flex'>
                <Image
                    src='https://cdn-icons-png.flaticon.com/512/2111/2111320.png'
                    alt='Profile Image'
                    borderRadius='full'
                    boxSize='100px'
                    mb={5}
                />
                <Stack marginLeft={5} marginTop={5}>
                    <Heading size='lg'>Airbnb</Heading>
                    <Heading size='md'>Junior React Developer</Heading>
                    <Tabs>
                        <TabList>
                            <Tab>Details</Tab>
                            <Tab>Application form</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                            
                            <Text mb={5}> <Icon as={FaLocationDot}/>Mumbai</Text>

                            <SimpleGrid columns={[2,null,4]} spacing={10} mb={8}>
                                <Box>
                                    <Text> <Icon as={MdOutlineNotStarted} mt={1}/> Start Date</Text>
                                    <Text>Immediately</Text>
                                </Box>
                                <Box>
                                    <Text> <Icon as={LiaMoneyBillSolid} mt={1}/> Salary</Text>
                                    <Text>$12-14K/Month</Text>
                                </Box>
                                <Box>
                                    <Text> <Icon as={MdOutlineWorkOutline} mt={1}/> Experience</Text>
                                    <Text>0-2 year</Text>
                                </Box>
                                <Box>
                                    <Text> <Icon as={RxLapTimer} mt={1}/> Application Deadline</Text>
                                    <Text>25 Aug 2023</Text>
                                </Box>
                            </SimpleGrid>

                            <Heading size='md' mb={3}>Skills required</Heading>

                            <HStack mb={8} spacing={5}>
                                {
                                    Tags.map((Tagvalue)=>(
                                        <Tag sixe='lg' variant='solid' bgColor='rgb(238,120,107)' p={2}>
                                        {Tagvalue}
                                        </Tag>
                                    ))
                                }
                            </HStack>

                            <Heading size='md' mb={5}>About the Job</Heading>
                            <Text mb={8}> Develop compelling and original content, including articles, blog posts, social media posts, videos, infographics, and more. Collaborate with the marketing team to create content strategies that resonate with our target audience. Optimize content for SEO to improve visibility and organic reach. Manage content calendars and deadlines to ensure timely delivery of content. Engage with the audience through comments, messages, and social media interactions</Text>

                            <Heading size='md' mb={2}>No. of openings</Heading>
                            <Text mb={5}>12</Text>

                            <Button
                            variant={'solid'}
                            bgColor= 'rgb(238,120,107)'
                            color= 'white'
                            size={'md'}
                            width='10rem'
                            p={2}
                            >
                            Apply
                            </Button>
                            </TabPanel>
                            <TabPanel>
                            <p>Application form</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>
            </CardBody>
        </Card>
    </div>
  )
}

export default CompanyDetail