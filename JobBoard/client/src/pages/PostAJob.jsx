import { SimpleGrid , Box, Flex, Grid} from '@chakra-ui/react';
import React from 'react';
import Profile from '../components/home/profile/Profile';
import AllJobPosts from '../components/company/AllJobPosts';
import JobPostForm from '../components/company/JobPostForm';
import { useAuth } from '../context/authContext';
import { useParams } from 'react-router-dom';

const PostAJob = () => {

  const [ auth, setAuth] = useAuth();
  const heading = auth?.user?.userName;
  const subHeading = 'Hiring';
  const buttonLabel = 'View all job posts'
  const {id} = useParams();

  return (
    <Box bgColor={'rgb(248,250,252)'} p={5} display='flex' spacing='10px'> 
      <Grid gap={10} display='flex' flexDirection='row'>
        <Box width={'20vw'}>
          <Flex flexDirection='column'>
            <SimpleGrid columns={[1, null, 1]} spacing='15px'>
              <Profile heading={heading} subHeading={subHeading} buttonLabel={buttonLabel}/>
            </SimpleGrid>
          </Flex>
        </Box>
        <Box width={'70vw'}>
            <Flex flexDirection='column'>
                <SimpleGrid columns={[1, null, 1]} spacing='15px'>
                  <JobPostForm id={id} />
                </SimpleGrid>
            </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default PostAJob;