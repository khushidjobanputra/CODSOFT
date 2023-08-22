import React from 'react'
import { Stack, Checkbox, Card, Box, Text, Heading } from '@chakra-ui/react'

const Location = () => {
  return (
    <div>
        <Card borderRadius='15px'>
            <Box display='flex' flexDirection='column' p={4}>
            <Heading size='sm' as='b' mb={4} color='rgb(238,120,107)'>Location</Heading>
                <Stack>
                    <Checkbox size='md' colorScheme='orange'>
                        Checkbox
                    </Checkbox>
                    <Checkbox size='md' colorScheme='orange' defaultChecked>
                        Checkbox
                    </Checkbox>
                    <Checkbox size='md' colorScheme='orange' defaultChecked>
                        Checkbox
                    </Checkbox>
                </Stack>
            </Box>
        </Card>
    </div>
  )
}

export default Location