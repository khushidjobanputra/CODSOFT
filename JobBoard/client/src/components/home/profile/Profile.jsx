import { Button, Card, CardBody, Stack, Heading, Text, Image } from '@chakra-ui/react'
import React from 'react'

const Profile = ({heading, subHeading, buttonLabel}) => {
  return (
    <div>
        <Card borderRadius='15px'>
            <CardBody align='center'>
            <Image
                src='https://bit.ly/code-beast'
                alt='Profile Image'
                borderRadius='full'
                boxSize='100px'
                mb={5}
            />
            <Stack>
                <Heading size='md' align='center'>{heading}</Heading>
                <Text align='center' color='#CCD2D7'>{subHeading}</Text>
                <Button
                    bgColor={'rgb(248,250,252)'}
                    color={'#2A9FB9'}
                    mt={2}
                >{buttonLabel}</Button>
            </Stack>
            </CardBody>
        </Card>
    </div>
  )
}

export default Profile