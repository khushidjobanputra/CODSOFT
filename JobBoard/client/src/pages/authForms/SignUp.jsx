import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Grid,
  RadioGroup,
  Stack,
  Radio,
  useToast,
  Select
} from '@chakra-ui/react';
import {ViewOffIcon} from '@chakra-ui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const toast = useToast()
    const [role, setRole] = useState('Candidate')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async(e)=>{
        e.preventDefault()
        console.log(userName,  email, password, confirmPassword, role)

        try{
            const response = await axios.post(`${process.env.REACT_APP_API}/user/signup`, {userName, email, password, confirmPassword, role})
            console.log(response)

            if(response.status === 200){
                toast({
                    title: `registered successfully`,
                    position: 'top-right',
                    status: 'success',
                    isClosable: true,
                })
                navigate('/login')
            }
            else{
                toast({
                    title: `something went wrong`,
                    position: 'top-right',
                    status: 'error',
                    isClosable: true,
                })
            }
        }catch(error){
            console.log(error)
        }
    }

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
                name="userName" 
                placeholder="UserName" 
                boxShadow="#E0EDFB" 
                size='lg'
                onChange={(e) => setUserName(e.target.value)}
                value = {userName}
                />
            </InputGroup>
            <InputGroup>
              <Input 
                name="email" 
                placeholder="Email" 
                boxShadow="#E0EDFB" 
                size='lg'
                marginTop={4}
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                />
            </InputGroup>

            <InputGroup mt={4}>
              <Input
                name="password"
                placeholder="Password"
                boxShadow="#E0EDFB"
                size='lg'
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                />
              <InputRightElement position='relative'>
                <ViewOffIcon mr={20} mt={2}/>
              </InputRightElement>
            </InputGroup>

            <InputGroup mt={4}>
              <Input
                name="Cpassword"
                placeholder="Confirm Password"
                boxShadow="#E0EDFB"
                size='lg'
                onChange={(e)=> setConfirmPassword(e.target.value)}
                value={confirmPassword}
                />
              <InputRightElement position='relative'>
                <ViewOffIcon mr={20} mt={2}/>
              </InputRightElement>
            </InputGroup>

            <Select placeholder='Select option' mt={4} onChange={(e) => setRole(e.target.value)}>
              <option value='Candidate'>Candidate</option>
              <option value='Employer'>Employer</option>
            </Select>

            <Button
              bgColor='#FE6B68'
              boxShadow="#E8D5E6"
              mt={6}
              // width="50%"
              size='lg'
              color='white'
              onClick={handleRegister}
              >
              Sign Up
            </Button>
            <Text>Already registered?</Text>
            <Text onClick={()=>{navigate('/login')}} cursor={'pointer'}>Login</Text>
            </Grid>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignUp;