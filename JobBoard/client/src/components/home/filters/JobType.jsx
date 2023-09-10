import React, { useEffect, useState } from 'react';
import { Stack, Checkbox, Card, Box, Text, Heading } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useHistory from React Router

const JobType = () => {
  const navigate = useNavigate(); // Initialize the history object
  const location = useLocation(); 
  
  // State to keep track of selected checkboxes
  const [selectedemploymentTypes, setSelectedemploymentTypes] = useState([]);

  useEffect(() => {
    // When the component mounts, extract and set the selected locations from the URL
    const queryParams = new URLSearchParams(location.search);
    const selected = queryParams.getAll('employmentTypes');
    setSelectedemploymentTypes(selected);
  }, [location]);

  // Function to handle checkbox change
  const handleCheckboxChange = (employmentTypes) => {
    // Toggle the selected state of the checkbox
    const updatedemploymentTypes = selectedemploymentTypes.includes(employmentTypes)
      ? selectedemploymentTypes.filter((loc) => loc !== employmentTypes)
      : [...selectedemploymentTypes, employmentTypes];

    // Construct the URL based on the selected checkboxes
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete('employmentTypes'); // Remove existing 'locations' query parameters
    updatedemploymentTypes.forEach((loc) => queryParams.append('employmentTypes', loc));

    // Push the new URL to the history
    navigate(`/jobs/filters?${queryParams.toString()}`);
  };

  return (
    <div>
      <Card borderRadius='15px'>
        <Box display='flex' flexDirection='column' p={4}>
          <Heading size='sm' as='b' mb={4} color='rgb(238,120,107)'>
            Job Type
          </Heading>
          <Stack>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedemploymentTypes.includes('Full-time')}
              onChange={() => handleCheckboxChange('Full-time')}
            >
              Full-time
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedemploymentTypes.includes('Part-time')}
              onChange={() => handleCheckboxChange('Part-time')}
            >
              Part-time
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedemploymentTypes.includes('Internship')}
              onChange={() => handleCheckboxChange('Internship')}
            >
              Internship
            </Checkbox>
          </Stack>
        </Box>
      </Card>
    </div>
  );
};

export default JobType;
