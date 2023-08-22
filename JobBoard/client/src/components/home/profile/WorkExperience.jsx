import { Box, Card, CardBody, CardHeader, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const WorkExperience = () => {
  return (
    <div>
        <Card p={4} borderRadius='15px'>
            <Heading size='sm' as='b' mb={4} color='rgb(238,120,107)'>Work Experience</Heading>
            <Box>
                <Stack>
                    <Box display={'flex'} justifyContent='space-between'>
                        <Box>
                            <Heading size='sm'>Junior React Developer</Heading>
                            <Text color='#CCD2D7'>Airbnb - Fulltime</Text>
                        </Box>
                        <Box>
                            <Text color='#CCD2D7'>2 Months</Text>
                        </Box>
                    </Box>
                    <Box display={'flex'} justifyContent='space-between'>
                        <Box>
                            <Heading size='sm'>Junior React Developer</Heading>
                            <Text color='#CCD2D7'>Airbnb - Fulltime</Text>
                        </Box>
                        <Box>
                            <Text color='#CCD2D7'>2 Months</Text>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Card>
    </div>
  )
}

export default WorkExperience