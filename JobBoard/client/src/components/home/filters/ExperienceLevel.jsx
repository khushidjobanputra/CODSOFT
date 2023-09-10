import React, { useState, useEffect } from 'react';
import { Stack, Checkbox, Card, Box, Text, Heading } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useHistory and useLocation from React Router

const ExperienceLevel = () => {
  const navigate = useNavigate(); // Initialize the history object
  const location = useLocation(); // Get the current location

  // State to keep track of selected checkboxes
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState([]);

  useEffect(() => {
    // When the component mounts, extract and set the selected experience levels from the URL
    const queryParams = new URLSearchParams(location.search);
    const selected = queryParams.getAll('experienceLevels');
    setSelectedExperienceLevels(selected);
  }, [location]);

  // Function to handle checkbox change
  const handleCheckboxChange = (experienceLevel) => {

    // Toggle the selected state of the checkbox
    const updatedExperienceLevels = selectedExperienceLevels.includes(experienceLevel)
      ? selectedExperienceLevels.filter((level) => level !== experienceLevel)
      : [...selectedExperienceLevels, experienceLevel];

    // Construct the URL based on the selected checkboxes
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete('experienceLevels'); // Remove existing 'experienceLevels' query parameters
    updatedExperienceLevels.forEach((level) => queryParams.append('experienceLevels', level));

    // Push the new URL to the history
    navigate(`/jobs/filters?${queryParams.toString()}`);
  };

  return (
    <div>
      <Card borderRadius='15px'>
        <Box display='flex' flexDirection='column' p={4}>
          <Heading size='sm' as='b' mb={4} color='rgb(238,120,107)'>
            Experience Level
          </Heading>
          <Stack>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedExperienceLevels.includes('0-3 years')}
              onChange={() => handleCheckboxChange('0-3 years')}
            >
              0-3 years
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedExperienceLevels.includes('3-7 years')}
              onChange={() => handleCheckboxChange('3-7 years')}
            >
              3-7 years
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedExperienceLevels.includes('7-10 years')}
              onChange={() => handleCheckboxChange('7-10 years')}
            >
              7-10 years
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedExperienceLevels.includes('more than 10 years')}
              onChange={() => handleCheckboxChange('more than 10 years')}
            >
              more than 10 years
            </Checkbox>
          </Stack>
        </Box>
      </Card>
    </div>
  );
};

export default ExperienceLevel;
