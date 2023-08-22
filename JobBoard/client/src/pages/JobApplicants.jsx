import { SimpleGrid , Box, Flex, Grid, Card, Heading, Text, Icon} from '@chakra-ui/react';
import React from 'react';
import Profile from '../components/home/profile/Profile';
import AllJobPosts from '../components/company/AllJobPosts';
import {AiOutlineDollar} from 'react-icons/ai'
import {HiMiniUserGroup} from 'react-icons/hi2'
import ListOfApplicants from '../components/company/ListOfApplicants';

const JobApplicants = () => {
  const heading = 'Airbnb';
  const subHeading = 'Hiring';
  const buttonLabel = 'View all job posts'
  return (
    <Box bgColor={'rgb(248,250,252)'} p={5} display='flex' spacing='10px'> 
      <Grid gap={10} display='flex' flexDirection='row'>
        <Box width={'20vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <Profile heading={heading} subHeading={subHeading} buttonLabel={buttonLabel}/>
              <Card p={4} borderRadius='15px'>
                <Heading size='md' as='b' mb={4} color='rgb(238,120,107)'>Junior react developer</Heading>
                <Box display='flex' flexDirection='column'>
                    <Box  mb={4}>
                        <Icon as={AiOutlineDollar}/> $12-$14k/Month
                    </Box>
                    <Box  mb={4}>
                        <Icon as={HiMiniUserGroup}/> 4 openings
                    </Box>
                </Box>
                <Heading size='sm'>23 Applicants</Heading>
              </Card>
            </SimpleGrid>
          </Flex>
        </Box>
        <Box width={'70vw'}>
            <Flex flexDirection='column'>
                <SimpleGrid columns={[1, null, 1]} spacing='15px'>
                  <ListOfApplicants />
                </SimpleGrid>
            </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default JobApplicants;