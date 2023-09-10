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
  useToast,
  IconButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => setShowPassword(!showPassword)
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
      minHeight="90vh"
      backgroundColor="#F4F8FF"
    >
      <Box
        width="70%"
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
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                boxShadow="#E0EDFB"
                size='lg'
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                />
              <InputRightElement position='relative'>
                <IconButton
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  mr={20}
                  mt={2}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>

            <Button
              bgColor='rgb(238,120,107)'
              boxShadow="#E8D5E6"
              mt={6}
              size='lg'
              color='white'
              onClick={handleLogin}
              mb={3}
              sx={{'_hover': {backgroundColor: '#E2E8F0', color: '#2A9FB9'}}}
              >
              Sign In
            </Button>
            <Box display='flex' flexDirection='row'>
              <Text>New to JobPortal? </Text>
              <Text onClick={()=>{navigate('/signup')}} cursor={'pointer'} sx={{'_hover': {color: 'rgb(238,120,107)'}}}>Register</Text>
            </Box>
            </Grid>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignIn;