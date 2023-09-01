import React, {useState} from 'react';
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
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {ViewOffIcon} from '@chakra-ui/icons'
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const SignIn = () => {

    const toast = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    const handleLogin = async(e)=>{
        e.preventDefault()
        console.log(email, password)

        try{
            const response = await axios.post(`${process.env.REACT_APP_API}/user/signin`, {email, password})
            console.log(response)

            if(response.status === 200){
                toast({
                    title: `logged in successfully`,
                    position: 'top-right',
                    status: 'success',
                    isClosable: true,
                })
                setAuth({
                  ...auth,
                  user: response.data.existingUser,
                  token: response.data.token
                })
                localStorage.setItem("auth", JSON.stringify(response.data))
                navigate('/')
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
                type="email" 
                placeholder="Email" 
                boxShadow="#E0EDFB" 
                size='lg'
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                />
            </InputGroup>

            <InputGroup mt={4}>
              <Input
                type="password"
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

            <Button
              bgColor='#FE6B68'
              boxShadow="#E8D5E6"
              mt={6}
              size='lg'
              color='white'
              onClick={handleLogin}
              >
              Sign In
            </Button>
            <Text>New to JobPortal?</Text>
            <Text onClick={()=>{navigate('/signup')}} cursor={'pointer'}>Register</Text>
            </Grid>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignIn;