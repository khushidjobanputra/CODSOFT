import { Box, Button, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate('/jobs')
    }
  return (
    <div>
        <SimpleGrid display='flex' sx={{backgroundColor: '#F4F8FF', justifyContent: 'space-between', paddingX: 10}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Heading size='2xl'textColor='rgb(238,120,107)' mb='5rem' mt='6rem'>Connecting Talent with Opportunity</Heading>
                    <Image src='/images/image.png' alt='image' height='20vh' width='20vw' mt='3rem' borderRadius={5}/>
                </Box>
                <Text fontSize='2xl' fontWeight='semibold' mb='3rem'>Explore a world of job openings, connect with top employers, <br/> and take the next step in your professional journey. <br/>Your dream job awaits.</Text>
                <Button
                    variant={'solid'}
                    bgColor= 'rgb(238,120,107)'
                    color= 'white'
                    width='20rem'
                    size={'md'}
                    p={2}
                    sx={{'_hover': {backgroundColor: '#E2E8F0', color: '#2A9FB9'}}}
                    onClick={()=>handleClick()}
                >
                    Get Started
                </Button>
                <Image src='/images/19222.jpg' alt='image' height='20vh' ml='35rem' width='15vw' borderRadius={5}/>
            </Box>
            <Box>
                <Image src='/images/4171344.jpg' alt='image' height='90vh'/>
            </Box>
        </SimpleGrid>
    </div>
  )
}

export default Home