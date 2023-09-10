import React, { useState, useEffect } from 'react';
import { Stack, Checkbox, Card, Box, Text, Heading } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useHistory and useLocation from React Router

const Location = () => {
  const navigate = useNavigate(); // Initialize the history object
  const location = useLocation(); // Get the current location

  // State to keep track of selected checkboxes
  const [selectedLocations, setSelectedLocations] = useState([]);

  useEffect(() => {
    // When the component mounts, extract and set the selected locations from the URL
    const queryParams = new URLSearchParams(location.search);
    const selected = queryParams.getAll('locations');
    setSelectedLocations(selected);
  }, [location]);

  // Function to handle checkbox change
  const handleCheckboxChange = (locationName) => {
    // Toggle the selected state of the checkbox
    const updatedLocations = selectedLocations.includes(locationName)
      ? selectedLocations.filter((loc) => loc !== locationName)
      : [...selectedLocations, locationName]; 

    // Construct the URL based on the selected checkboxes
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete('locations'); // Remove existing 'locations' query parameters
    updatedLocations.forEach((loc) => queryParams.append('locations', loc));

    // Push the new URL to the history
    navigate(`/jobs/filters?${queryParams.toString()}`);
  };

  return (
    <div>
      <Card borderRadius='15px'>
        <Box display='flex' flexDirection='column' p={4}>
          <Heading size='sm' as='b' mb={4} color='rgb(238,120,107)'>
            Location
          </Heading>
          <Stack>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedLocations.includes('mumbai')}
              onChange={() => handleCheckboxChange('mumbai')}
            >
              Mumbai
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedLocations.includes('Pune')}
              onChange={() => handleCheckboxChange('Pune')}
            >
              Pune
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedLocations.includes('Banglore')}
              onChange={() => handleCheckboxChange('Banglore')}
            >
              Banglore
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedLocations.includes('Hyderabad')}
              onChange={() => handleCheckboxChange('Hyderabad')}
            >
              Hyderabad
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              isChecked={selectedLocations.includes('Delhi')}
              onChange={() => handleCheckboxChange('Delhi')}
            >
              Delhi
            </Checkbox>
          </Stack>
        </Box>
      </Card>
    </div>
  );
};

export default Location;
