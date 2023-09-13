import React, { useState } from 'react'
import { Card, Box, Text, InputGroup, InputLeftElement, Input, Button } from '@chakra-ui/react'
import {Search2Icon} from '@chakra-ui/icons'
import { useSearch } from '../../../context/searchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useJobContext } from '../../../context/jobContext';

const Search = () => {
    // console.log(length)
    const Alljobs = useJobContext();

    const { updateSearchResults, searchResults, searchTerm, setSearchTerm } = useSearch(); // Use the context

    const [searchTermLocal, setSearchTermLocal] = useState('');

    const userDataString = localStorage.getItem('auth');
    const userData = JSON.parse(userDataString);
    const authToken = userData.token;
  
    const navigate = useNavigate();
    // console.log(searchResults)

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            setSearchTerm(searchTermLocal); 
            try {
            const response = await axios.get(`${process.env.REACT_APP_API}/jobs/search?jobRole=${searchTermLocal}`,{
                method: 'GET',
                headers: {  
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${authToken}`
                },
            });
            updateSearchResults(response.data);
            } catch (error) {
            console.error(error);
            }
            
            navigate(`/jobs/search?jobRole=${searchTerm}`);
        }
    };

  return (
    <div>
        <Card borderRadius='15px' p={4}>
            <Box display='flex' flexDirection='column'>
                <Text fontSize={'xl'} mb={4}>
                    Search Job
                </Text>
                <InputGroup bgColor={'rgb(248,250,252)'}>
                    <InputLeftElement pointerEvents='none'>
                    <Search2Icon color='gray.300' />
                    </InputLeftElement>
                    <Input type='tel' placeholder='Search...' onChange={(e) => setSearchTermLocal(e.target.value)} onKeyDown={handleSearch}/>
                </InputGroup>
                <Button
                    bgColor={'rgb(248,250,252)'}
                    color={'#2A9FB9'}
                    mt={4}
                >{searchResults.length == 0 ? Alljobs.length : searchResults.length} Jobs Found</Button>
            </Box>
        </Card>
    </div>
  )
}

export default Search