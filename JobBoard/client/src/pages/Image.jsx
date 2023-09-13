import React from 'react'
import { Box, Heading, Image } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import image from '../Images/resume.png'

const Images = () => {
    const {id} = useParams();
    // console.log(id)
    // const imagePath = require(`../Images/${id}`).default;
    // console.log(imagePath)
  return (
    <Box display='flex' flexDirection='column' alignContent='center' paddingX='200px'>
        <Heading size='lg' mb={5}>Resume</Heading>
        <Image src={image} height="110vh" width="50vw"/>
        {/* <Image src={`../Images/${id}`} height="200px" width="200px"/> */}
    </Box>
  )
}

export default Images