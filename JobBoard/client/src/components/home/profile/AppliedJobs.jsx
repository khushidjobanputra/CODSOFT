import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Box, Button,Table, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Heading, Select, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, useSteps, StepSeparator} from '@chakra-ui/react'

const AppliedJobs = ({id}) => {

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [companyIds, setCompanyIds] = useState([]);
  const [jobModels, setJobModels] = useState([]);
  const userDataString = localStorage.getItem('auth');
  const userData = JSON.parse(userDataString);
  const authToken = userData.token;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentApplicantStatus, setCurrentApplicantStatus] = useState('');
  const [activeStep, setActiveStep] = useState(1); 
  const steps = [
    { title: 'Applied'},
    { title: 'Shortlisted'},
    { title: 'Selected'},
  ]

  useEffect(() => {
    const mapStepToIndex = (step) => {
      switch (step) {
        case 'Applied':
          return 1;
        case 'Shortlisted':
          return 2;
        case 'Selected':
          return 3;
        default:
          return 1;
      }
    };

    setActiveStep(mapStepToIndex(currentApplicantStatus));
  }, [currentApplicantStatus]);

  const handleOpenModal = (applicantStatus) => {
    setCurrentApplicantStatus(applicantStatus);
    // console.log(applicantStatus)
    // console.log(currentApplicantStatus);
    // console.log(activeStep)
    onOpen();
  };

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

        const extractedCompanyIds = response.data.map(appliedJob => appliedJob.companyId);

        setAppliedJobs(response.data);
        setCompanyIds(extractedCompanyIds);

        const jobModelRequests = extractedCompanyIds.map(companyId =>
          axios.get(`${process.env.REACT_APP_API}/jobs/${companyId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
          })
        );
  
        const jobModelResponses = await Promise.all(jobModelRequests);
        const jobModels = jobModelResponses.map(response => response.data);
        setJobModels(jobModels);

      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])
  
  return (
    <div>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
            <Thead>
            <Tr>
                <Th>Company Name</Th>
                <Th>JobRole</Th>
                <Th>Employment Type</Th>
                <Th>Locations</Th>
                <Th>Salary</Th>
                <Th>Application Status</Th>
            </Tr>
            </Thead>
            <Tbody>
                {
                    appliedJobs.map((appliedJob, index)=>(
                        <>
                        <Tr>
                            <Td>{jobModels[index]?.companyName}</Td>
                            <Td>{jobModels[index]?.jobRole}</Td>
                            <Td>{jobModels[index]?.employmentType}</Td>
                            <Td>{jobModels[index]?.locations.map((location)=> <Tag mr={2} p={2}>{location}</Tag>)}</Td>
                            <Td>{jobModels[index]?.salary.min}-{jobModels[index]?.salary.max}</Td>
                            <Td>
                              <Button onClick={() => handleOpenModal(appliedJob.step)}>{appliedJob?.step}</Button>
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
          <Stepper index={activeStep} orientation='vertical' height='200px' gap='0' colorScheme='green'>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink='0'>
                  <StepTitle>{step.title}</StepTitle>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AppliedJobs