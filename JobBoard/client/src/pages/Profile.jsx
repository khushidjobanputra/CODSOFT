import { SimpleGrid , Box, Flex, Grid} from '@chakra-ui/react';
import React from 'react';
import Profile from '../components/home/profile/Profile';
import WorkExperience from '../components/home/profile/WorkExperience';
import Skills from '../components/home/profile/Skills';
import { useAuth } from '../context/authContext';
import AppliedJobs from '../components/home/profile/AppliedJobs';
import { useParams } from 'react-router-dom';
import Info from '../components/home/profile/Info';

const HomePage = () => {
  const [auth, setAuth] = useAuth()

  const {id} = useParams();
  // console.log(id)
  const heading = auth?.user?.userName;
  const subHeading = auth?.user?.role;
  const buttonLabel = 'View Profile'

  return (
    <Box bgColor={'rgb(248,250,252)'} p={5} display='flex' spacing='10px'> 
      <Grid gap={10} display='flex' flexDirection='row'>
        <Box width={'20vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <Profile heading={heading} subHeading={subHeading} buttonLabel={buttonLabel}/>
              <Info id={id}/>
              {/* <WorkExperience /> */}
              {/* <Skills /> */}
            </SimpleGrid>
          </Flex>
        </Box>
        <Box width={'70vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
                <AppliedJobs id={id}/>
            </SimpleGrid>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default HomePage;