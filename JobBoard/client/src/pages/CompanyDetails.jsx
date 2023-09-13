import { SimpleGrid , Box, Flex, Grid} from '@chakra-ui/react';
import React from 'react';
import Profile from '../components/home/profile/Profile';
import WorkExperience from '../components/home/profile/WorkExperience';
import Skills from '../components/home/profile/Skills';
import CompanyDetail from '../components/company/CompanyDetail';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const CompanyDetails = () => {

  const {id} = useParams();
  const [auth, setAuth] = useAuth();

  const userDataString = localStorage.getItem('auth');
  const userData = JSON.parse(userDataString);
  const authToken = userData.token;

  const heading = auth?.user?.userName;
  const subHeading = auth?.user?.role;
  const buttonLabel = 'View Profile'

  return (
    <Box bgColor={'rgb(248,250,252)'} height='100vh' p={5} display='flex' spacing='10px'> 
      <Grid gap={10} display='flex' flexDirection='row'>
        <Box width={'20vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <Profile heading={heading} subHeading={subHeading} buttonLabel={buttonLabel}/>
              {/* <WorkExperience /> */}
              {/* <Skills /> */}
            </SimpleGrid>
          </Flex>
        </Box>
        <Box width={'70vw'}>
            <Flex flexDirection='column'>
                <SimpleGrid columns={[1, null, 1]} spacing='15px'>
                    <CompanyDetail id={id} />
                </SimpleGrid>
            </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default CompanyDetails;