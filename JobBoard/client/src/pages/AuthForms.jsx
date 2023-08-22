import React from 'react';
import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Grid
} from '@chakra-ui/react';

import {ViewOffIcon} from '@chakra-ui/icons'

const AuthForms = () => {
  return (
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      backgroundColor="#E0E3E9"
      p={4}
    >
      <Box
        width="90%"
        height="90%"
        p={2}
        backgroundColor="white"
        borderRadius="18px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Flex direction="row" align="center">
          <Box flex='1'>
            <Image src='https://images.businessnewsdaily.com/app/uploads/2022/04/04081920/1554239632.jpeg' alt="Sign In" borderRadius="18px" width="40vw" height="80vh" />
          </Box>
          
          <Box flex='1'>
          <Grid justifyContent='center'>
            <Text  mb={1} fontSize="4xl" align="center">
              Hello Again!
            </Text>
            <Text mb={6} fonstSize="sm" align="center">
              Welcome back you have been missed!
            </Text>
            <InputGroup>
              <Input 
                type="email" 
                placeholder="Enter username" 
                boxShadow="#E0EDFB" 
                // width="50%"
                size='lg'
                />
            </InputGroup>

            <InputGroup mt={4}>
              <Input
                type="password"
                placeholder="Password"
                boxShadow="#E0EDFB"
                // width="50%"
                size='lg'
                />
              <InputRightElement position='relative'>
                <ViewOffIcon mr={20} mt={2}/>
              </InputRightElement>
            </InputGroup>

            <Button
              bgColor='#FE6B68'
              boxShadow="#E8D5E6"
              mt={6}
              // width="50%"
              size='lg'
              color='white'
              >
              Sign In
            </Button>
            </Grid>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AuthForms;