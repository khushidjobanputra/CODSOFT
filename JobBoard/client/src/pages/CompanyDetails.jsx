import { SimpleGrid , Box, Flex, Grid} from '@chakra-ui/react';
import React from 'react';
import Profile from '../components/home/profile/Profile';
import WorkExperience from '../components/home/profile/WorkExperience';
import Skills from '../components/home/profile/Skills';
import CompanyDetail from '../components/company/CompanyDetail';

const CompanyDetails = () => {
  return (
    <Box bgColor={'rgb(248,250,252)'} p={5} display='flex' spacing='10px'> 
      <Grid gap={10} display='flex' flexDirection='row'>
        <Box width={'20vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <Profile />
              <WorkExperience />
              <Skills />
            </SimpleGrid>
          </Flex>
        </Box>
        <Box width={'70vw'}>
            <Flex flexDirection='column'>
                <SimpleGrid columns={[1, null, 1]} spacing='15px'>
                    <CompanyDetail />
                </SimpleGrid>
            </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default CompanyDetails;