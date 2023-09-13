import React, { useState } from 'react'
import { TableContainer, Table, Thead, Tr, Th, Td, Tbody, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Heading, Menu, MenuButton, MenuList, MenuItem, SimpleGrid, Select, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { Router, useLocation } from 'react-router-dom';

const ListOfApplicants = ({applicants}) => {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");  
  const companyName = queryParams.get("companyName");  
  // console.log(jobId, companyName)

    const toast = useToast();
    // const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus] = useState('Applied');
    const [currentApplicant, setCurrentApplicant] = useState(null);
    const userDataString = localStorage.getItem('auth');
    const userData = JSON.parse(userDataString);
    const authToken = userData.token;

    const handleOpenModal = (applicant) => {
      setStatus(applicant?.step);
      setCurrentApplicant(applicant);
      onOpen();
    };

    const handleClose = async(currentApplicant)=>{
      // console.log(...currentApplicant, currentApplicant?.step)
      console.log(currentApplicant?._id)
      console.log(currentApplicant?.step)
      console.log(status)

      const response = await axios.patch(`${process.env.REACT_APP_API}/application/update/${currentApplicant?._id}`,{step: `${status}`} ,{
        method: 'patch',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${authToken}`
        },
      })
      
      const resp = await axios.post(`${process.env.REACT_APP_API}/api/sendEmail`, {
        to: `${currentApplicant.email}`,
        subject: `Application ${status} successfully`,
        text: `${status == 'Selected' ? `Congratulation! 🎊🎊🎊 You are ${status} for this Job Role.`: `Your application is ${status} successfully.`}`,
      },  {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${authToken}`
        },
      });

      console.log(resp)
      if (resp.status === 200) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
      
      if(response.status === 200){
        toast({
          title: `status updated successfully`,
          position: 'top-right',
          status: 'success',
          isClosable: true,
        })
        window.location.reload();
      }
      else{
        toast({
          title: `Something went wrong`,
          position: 'top-right',
          status: 'error',
          isClosable: true,
        })
      }
      console.log(response)

      if (status === 'Selected') {
        const jobUpdateResponse = await axios.patch(
          `${process.env.REACT_APP_API}/jobs/update/${jobId}`,
          {
            $inc: { numberOfOpenings: -1 }, // Decrease numberOfOpenings by 1
          },
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          }
        );
    
        if (jobUpdateResponse.status === 200) {
          console.log('numberOfOpenings updated successfully');
        } else {
          console.error('Error updating numberOfOpenings');
        }
      }
      onClose()
    }
    
  return (
    <div>
        <TableContainer>
        <Table variant='striped' colorScheme='teal'>
            <Thead>
            <Tr>
                <Th>Applicants Name</Th>
                <Th>Github Profile</Th>
                <Th>Contact</Th>
                <Th>View Resume</Th>
                <Th>Application Status</Th>
            </Tr>
            </Thead>
            <Tbody>
                {
                    applicants?.data?.map((applicant)=>(
                        <>
                        <Tr>
                            <Td>{applicant.fullName}</Td>
                            <Td>{applicant.githubProfile}</Td>
                            <Td>{applicant.phoneNumber}</Td>
                            <Td><Button>
                              <a
                                href={`../../images/${applicant?.resume}`} // Assuming 'applicant.resume' contains the URL to the PDF file
                                target="_blank" // Open the link in a new tab
                                rel="noopener noreferrer" // Recommended for security
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent the default behavior of following the link
                                  window.open(e.currentTarget.getAttribute('href'), '_blank'); // Open the PDF in a new tab
                                }}
                              >
                                View Resume
                              </a>
                              </Button></Td>
                            <Td>
                              <Button onClick={() => handleOpenModal(applicant)}>{applicant.step}</Button>
                            </Td>
                        </Tr>
                        </>
                    ))
                }
            </Tbody>
        </Table>
        </TableContainer>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size='lg'>Application Status</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid >
                <Text fontSize='lg' as='b'>Current Status: {currentApplicant?.step}</Text>
                <br />
                <Text fontSize='lg' as='b'>Change Status:
                <Select placeholder='Status' variant='filled' mt={2} onChange={(e)=> setStatus(e.target.value)}>
                    <option value='Applied'>Applied</option>
                    <option value='Shortlisted'>Shortlisted</option>
                    <option value='Selected'>Selected</option>
                </Select>
                </Text>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleClose(currentApplicant)}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ListOfApplicants