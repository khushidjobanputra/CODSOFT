import React from 'react'
import { Card, Box, Text, InputGroup, InputLeftElement, Input, Button } from '@chakra-ui/react'
import {Search2Icon} from '@chakra-ui/icons'

const Search = () => {
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
                    <Input type='tel' placeholder='Search...' />
                </InputGroup>
                <Button
                    bgColor={'rgb(248,250,252)'}
                    color={'#2A9FB9'}
                    mt={4}
                >15 Jobs Found</Button>
            </Box>
        </Card>
    </div>
  )
}

export default Search