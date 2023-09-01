import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Router } from 'react-router-dom';

const steps = [
  'Personal Information',
  'Resume/CV',
  'Work Experience',
  'Personal Devlopment',
  'Projects/Portfolio',
];

const ApplicationForm = ({id}) => {

  const userDataString = localStorage.getItem('auth');
  const userData = JSON.parse(userDataString);
  const authToken = userData.token;

  const [step, setStep] = useState(0);
  // const [formData, setFormData] = useState({projectLinks: []});
  const [formData, setFormData] = useState({projectLinks: [], companyId: `${id}`, user: userData.existingUser._id});
  const [auth, setAuth] = useAuth()
  const [projectLinks, setProjectLinks] = useState([]);
  const [showProjectInput, setShowProjectInput] = useState(false);
  const [newProjectLink, setNewProjectLink] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  // console.log(auth?.user)
  // console.log(id)

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };


  const handleAddProjectLink = () => {
    setShowProjectInput(true);
  };

  const handleProjectLinkChange = (e) => {
    setNewProjectLink(e.target.value);
  };

  const handleSaveProjectLink = () => {
    if (newProjectLink.trim() !== '') {
      const updatedProjectLinks = [...projectLinks, newProjectLink];
      setProjectLinks(updatedProjectLinks);
      setNewProjectLink('');
      setShowProjectInput(false);

      setFormData((prevFormData) => ({
        ...prevFormData,
        projectLinks: updatedProjectLinks,
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  // console.log(userData);

  const handleSubmit = async() =>{

    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/application/create`, formData, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${authToken}`
        },
      })

      if(response.status === 201){
        toast({
          title: `Job posted successfully`,
          position: 'top-right',
          status: 'success',
          isClosable: true,
        })
        navigate('/')
        Router.refresh();
      }
      else{
        toast({
          title: `Something went wrong`,
          position: 'top-right',
          status: 'error',
          isClosable: true,
        })
        navigate('/')
      }
    }catch(error){
      console.log("Errorrrrr")
      console.log(error);
    }
  }

  useEffect(()=>{
    console.log(formData)
  },[])

  return (
    <Box maxWidth="500px" mx="auto" p="4">
      <FormControl mb="4">
        <FormLabel>{steps[step]}</FormLabel>
        {/* Example: Step 0 */}
        {step === 0 && (
          <>
            <FormControl mb="4">
                <FormLabel>Full Name</FormLabel>
                <Input type="text" placeholder="John Doe" onChange={(e) => handleInputChange('fullName', e.target.value)} />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="johndoe@example.com" onChange={(e) => handleInputChange('email', e.target.value)} />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Phone Number</FormLabel>
                <Input type="tel" placeholder="123-456-7890" onChange={(e) => handleInputChange('phoneNumber', e.target.value)} />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Location</FormLabel>
                <Input type="text" placeholder="City, Country" onChange={(e) => handleInputChange('location', e.target.value)} />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>LinkedIn Profile</FormLabel>
                <Input type="url" placeholder="https://www.linkedin.com/in/johndoe" onChange={(e) => handleInputChange('linkedInProfile', e.target.value)} />
            </FormControl>
          </>
        )}
        {/* Example: Step 1 */}
        {step === 1 && (
          <>
             <FormControl mb="4">
                <FormLabel>Upload Resume/CV</FormLabel>
                <Input type="file" accept=".pdf,.doc,.docx"  />
            </FormControl>
          </>
        )}
        {step === 2 && (
          <>
            <FormControl mb="4">
                <FormLabel>Previous Job Experience</FormLabel>
                <Textarea placeholder="Share your previous work experience" onChange={(e) => handleInputChange('previousJobExperience', e.target.value)} />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Job Descriptions and Responsibilities</FormLabel>
                <Textarea placeholder="Describe your role and responsibilities" onChange={(e) => handleInputChange('previousJobDescription', e.target.value)}/>
            </FormControl>
          </>
        )}
        {step === 3 && (
          <>
            <FormControl mb="4">
                <FormLabel>Personal Devlopment</FormLabel>
                <Textarea
                placeholder="Your Strength"
                onChange={(e) => handleInputChange('strength', e.target.value)}
                mb={4}
                />
                <Textarea
                placeholder="Your weakness"
                onChange={(e) => handleInputChange('weakness', e.target.value)}
                mb={4}
                />
                <Textarea
                placeholder="Your Personal Objective"
                onChange={(e) => handleInputChange('objective', e.target.value)}
                />
            </FormControl>
          </>
        )}
        {step === 4 && (
          <>
            <FormControl mb="4">
              {projectLinks.map((link, index) => (
                  <div key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </div>
              ))}
              {showProjectInput ? (
                  <>
                    <Input
                      type="url"
                      placeholder="https://github.com/yourusername/project"
                      value={newProjectLink}
                      onChange={handleProjectLinkChange}
                      mb="2"
                    />
                    <Button colorScheme="teal" onClick={handleSaveProjectLink}>
                      Save Project Link
                    </Button>
                  </>
                ) : (
                  <Button colorScheme="teal" onClick={handleAddProjectLink}>
                    Add Project Link
                  </Button>
                )}
            </FormControl>
            <FormControl mb="4">
                <FormLabel>GitHub Repository</FormLabel>
                <Input type="url" placeholder="https://github.com/yourusername" onChange={(e) => handleInputChange('githubProfile', e.target.value)}/>
            </FormControl>
          </>
        )}
        
      </FormControl>

      <Button
        colorScheme="teal"
        onClick={handlePrevious}
        disabled={step === 0}>
        Previous
      </Button>
      {step === steps.length - 1 ? (
        <Button colorScheme="teal" ml="2" onClick={handleSubmit}>
          Submit
        </Button>
      ) : (
        <Button 
          colorScheme="teal"
          ml="2"
          onClick={handleNext}
          disabled={step === steps.length - 1}
        >
          Next
        </Button>
      )}
    </Box>
  );
};

export default ApplicationForm;
