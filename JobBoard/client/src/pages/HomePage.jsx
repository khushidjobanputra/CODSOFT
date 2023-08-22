import { SimpleGrid , Box, Flex, Grid} from '@chakra-ui/react';
import React from 'react';
import Profile from '../components/home/profile/Profile';
import WorkExperience from '../components/home/profile/WorkExperience';
import Skills from '../components/home/profile/Skills';
import Search from '../components/home/jobs/Search';
import Job from '../components/home/jobs/Job';
import ExperienceLevel from '../components/home/filters/ExperienceLevel';
import Location from '../components/home/filters/Location';
import JobType from '../components/home/filters/JobType';
import JobRole from '../components/home/filters/JobRole';

const HomePage = () => {
  const heading = 'Khushi Jobanputra';
  const subHeading = 'Junior react developer';
  const buttonLabel = 'View Profile'

  return (
    <Box bgColor={'rgb(248,250,252)'} p={5} display='flex' spacing='10px'> 
      <Grid gap={10} display='flex' flexDirection='row'>
        <Box width={'20vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <Profile heading={heading} subHeading={subHeading} buttonLabel={buttonLabel}/>
              <WorkExperience />
              <Skills />
            </SimpleGrid>
          </Flex>
        </Box>
        <Box width={'50vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <Search />
              <Job />
            </SimpleGrid>
          </Flex>
        </Box>
        <Box width={'16vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <ExperienceLevel />
              <Location />
              <JobType />
              <JobRole />
            </SimpleGrid>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default HomePage;