import React, { useEffect, useState } from 'react';
import { Stack, Checkbox, Card, Box, Text, Heading } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useHistory from React Router

const JobRole = () => {

  const navigate = useNavigate(); // Initialize the history object
  const location = useLocation(); // Get the current location

  // State to keep track of selected checkboxes
  const [selectedJobRoles, setSelectedJobRoles] = useState([]);

  useEffect(() => {
    // When the component mounts, extract and set the selected locations from the URL
    const queryParams = new URLSearchParams(location.search);
    const selected = queryParams.getAll('jobRoles');
    setSelectedJobRoles(selected);
  }, [location]);

  // Function to handle checkbox change
  const handleCheckboxChange = (locationName) => {
    // Toggle the selected state of the checkbox
    const updatedJobRoles = selectedJobRoles.includes(locationName)
      ? selectedJobRoles.filter((loc) => loc !== locationName)
      : [...selectedJobRoles, locationName]; 

    // Construct the URL based on the selected checkboxes
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete('jobRoles'); // Remove existing 'locations' query parameters
    updatedJobRoles.forEach((loc) => queryParams.append('jobRoles', loc));

    // Push the new URL to the history
    navigate(`/jobs/filters?${queryParams.toString()}`);
  };

  // const navigate = useNavigate(); // Initialize the history object

  // // State to keep track of selected checkboxes
  // const [selectedJobRoles, setSelectedJobRoles] = useState([]);

  // // Function to handle checkbox change
  // const handleCheckboxChange = (jobRole) => {

  //   const encodedJobRole = jobRole.replace(/ /g, '%20');

  //   // Toggle the selected state of the checkbox
  //   const updatedJobRoles = selectedJobRoles.includes(encodedJobRole)
  //     ? selectedJobRoles.filter((role) => role !== encodedJobRole)
  //     : [...selectedJobRoles, encodedJobRole];

  //   // Update the selectedJobRoles state
  //   setSelectedJobRoles(updatedJobRoles);

  //   // Construct the URL based on the selected checkboxes
  //   const url = `/jobs/filters?jobRoles=${updatedJobRoles.join(',')}`;

  //   // Push the new URL to the history
  //   navigate(url);
  // };

  return (
    <div>
      <Card borderRadius='15px'>
        <Box display='flex' flexDirection='column' p={4}>
          <Heading size='sm' as='b' mb={4} color='rgb(238,120,107)'>
            Job Role
          </Heading>
          <Stack>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedJobRoles.includes('software%20engineering')}
              onChange={() => handleCheckboxChange('software engineering')}
            >
              Software Engineer
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedJobRoles.includes('Frontend%20Developer')}
              onChange={() => handleCheckboxChange('Frontend Developer')}
            >
              Frontend Developer
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedJobRoles.includes('Backend%20Developer')}
              onChange={() => handleCheckboxChange('Backend Developer')}
            >
              Backend Developer
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedJobRoles.includes('Fullstack%20Developer')}
              onChange={() => handleCheckboxChange('Fullstack Developer')}
            >
              Fullstack Developer
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedJobRoles.includes('AI/ML%20Developer')}
              onChange={() => handleCheckboxChange('AI/ML Developer')}
            >
              AI/ML Developer
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedJobRoles.includes('UI/UX%20Designer')}
              onChange={() => handleCheckboxChange('UI/UX Designer')}
            >
              UI/UX Designer
            </Checkbox>
          </Stack>
        </Box>
      </Card>
    </div>
  );
};

export default JobRole;
