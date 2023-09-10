import { Card, Heading, Box, Text, UnorderedList, ListItem } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Info = ({id}) => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const userDataString = localStorage.getItem('auth');
    const userData = JSON.parse(userDataString);
    const authToken = userData.token;

    useEffect(()=>{

        const fetchData=async()=>{
          try{
            const response = await axios.get(`${process.env.REACT_APP_API}/application/user/${id}`,{
              method: 'GET',
              headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${authToken}`
              },
            })
    
            setAppliedJobs(response.data);
    
          }catch(error){
            console.log(error)
          }
        }
        fetchData()
      },[])

  return (
    <div>
        <Card p={4} borderRadius='15px'>
            <Heading size='sm' as='b' mb={4} color='rgb(238,120,107)'>Applied Jobs</Heading>
            <Text>Applied in {appliedJobs.length} Jobs</Text>
        </Card>
    </div>
  )
}

export default Info