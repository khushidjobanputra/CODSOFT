import { Card, Heading, Box, Text, UnorderedList, ListItem } from '@chakra-ui/react'
import React from 'react'

const Skills = () => {
  return (
    <div>
        <Card p={4} borderRadius='15px'>
            <Heading size='sm' as='b' mb={4} color='rgb(238,120,107)'>Work Experience</Heading>
            <UnorderedList>
                <ListItem>
                    <Box display='flex' justifyContent='space-between'>
                        <Text>UI designer</Text>
                        <Text color='#CCD2D7'>1-2 years</Text>
                    </Box>
                </ListItem>
                <ListItem>
                    <Box display='flex' justifyContent='space-between'>
                        <Text>React Devloper</Text>
                        <Text color='#CCD2D7'>1-2 years</Text>
                    </Box>
                </ListItem>
            </UnorderedList>
        </Card>
    </div>
  )
}

export default Skills