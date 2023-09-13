import { Card, CardBody, FormControl, FormLabel, Heading, Input, Textarea, Box, Flex, Tag, TagLabel, TagCloseButton, Button, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Grid, SimpleGrid, Image } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Router } from 'react-router-dom';

const JobPostForm = ({id}) => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [salary, setSalary] = useState([50000, 100000]);
  const [companyName, setCompanyName] = useState('');
//   const [companyLogo, setCompanyLogo] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [numberOfOpenings, setNoOfOpenings] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');

  const navigate = useNavigate()
  const toast = useToast()

  const handleAddSkill = () => {
    if (skillInput.trim() !== '' && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddLocation = () => {
    if (locationInput.trim() !== '' && !locations.includes(locationInput)) {
      setLocations([...locations, locationInput]);
      setLocationInput('');
    }
  };

  const handleRemoveLocation = (location) => {
    setLocations(locations.filter((s) => s !== location));
  };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setCompanyLogo(file);
//   };

  const userDataString = localStorage.getItem('auth');
  const userData = JSON.parse(userDataString);
  const authToken = userData.token;
  const data = {companyName, title, description, jobRole, numberOfOpenings, experience, skills, locations, employmentType, applicationDeadline, 
    salary: {
        min: salary[0],
        max: salary[1],
      },
    companyId: `${id}`,
  }

  const handlePost = async(e)=>{
    e.preventDefault();
    console.log(data)

    try{
        const response = await axios.post(`${process.env.REACT_APP_API}/jobs/create`, data,{
            method: 'Post',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${authToken}`
            },
        })

        console.log(response);

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
                title: `something went wrong`,
                position: 'top-right',
                status: 'error',
                isClosable: true,
            })
        }
    }catch(error){
        console.log(error);
    }
    
  }

  return (
    <Card borderRadius='15px'>
        <CardBody>
            <FormControl>
                <Heading align='center' mb={8} size='xl' color='rgb(238,120,107)'>Post a Job</Heading>
                <SimpleGrid columns={[1, null, 2]} spacing={10}>
                    <Box>
                        <FormLabel>Company Name</FormLabel>
                        <Input placeholder='Company Name' mb={5} value={companyName} onChange={(e)=> {setCompanyName(e.target.value)}}/>
                        {/* <FormLabel>Company Logo</FormLabel>
                        <Input type="file" accept="image/*" onChange={(e)=>handleImageChange(e)}  mb={5}/> */}
                        <FormLabel>Title</FormLabel>
                        <Input placeholder='title' mb={5} value={title} onChange={(e)=> {setTitle(e.target.value)}}/>
                        <Box mb="2">
                            <FormLabel>Skills Required</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter skills"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                            />
                            <Button
                                bgColor='rgb(238,120,107)'
                                size="sm"
                                onClick={handleAddSkill}
                                marginTop={2}
                                color='white'
                                mb={5}
                                sx={{'_hover': {backgroundColor: '#E2E8F0', color: '#2A9FB9'}}}
                            >
                                Add Skill
                            </Button>
                        </Box>
                        <Flex flexWrap="wrap">
                        {skills.map((skill, index) => (
                            <Tag
                            key={index}
                            size="md"
                            borderRadius="full"
                            variant="solid"
                            bgColor='#2A9FB9'
                            mr="2"
                            mb="2"
                            p={2}
                            >
                            <TagLabel>{skill}</TagLabel>
                            <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
                            </Tag>
                        ))}
                        </Flex>
                        <FormLabel>No. of openings</FormLabel>
                        <Input placeholder='no. of openings' mb={5} value={numberOfOpenings} onChange={(e)=> {setNoOfOpenings(e.target.value)}}/>
                        <FormLabel>Application Deadline</FormLabel>
                        <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        mb={5}
                        value={applicationDeadline}
                        onChange={(e)=> {setApplicationDeadline(e.target.value)}}
                        />
                        <Box>
                            <FormLabel>Salary Range</FormLabel>
                            <RangeSlider
                                min={0}
                                max={200000}
                                step={1000}
                                defaultValue={salary}
                                value={salary}
                                onChange={(newRange) => setSalary(newRange)}
                                mb={5}
                            >
                                <RangeSliderTrack>
                                    <RangeSliderFilledTrack />
                                </RangeSliderTrack>
                                <RangeSliderThumb index={0} />
                                <RangeSliderThumb index={1} />
                            </RangeSlider>
                            <Flex justifyContent="space-between">
                                <Box>{salary[0]}</Box>
                                <Box>{salary[1]}</Box>
                            </Flex>
                        </Box>
                    </Box>
                    <Box>
                        <FormLabel>Job Role</FormLabel>
                        <Input placeholder='Job Role'mb={5} value={jobRole} onChange={(e)=> {setJobRole(e.target.value)}}/>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder='Description of Job' mb={5} value={description} onChange={(e)=> {setDescription(e.target.value)}}/>
                        <FormLabel>Experience required</FormLabel>
                        <Input placeholder='experience' mb={5} value={experience} onChange={(e)=> {setExperience(e.target.value)}}/>
                        <FormLabel>Employment Type</FormLabel>
                        <Select placeholder='Select option' mb={5} value={employmentType} onChange={(e)=> {setEmploymentType(e.target.value)}}>
                        <option value='Full-time'>Full-time</option>
                        <option value='Part-time'>Part-time</option>
                        <option value='Internship'>Internship</option>
                        </Select>
                        <Box mb="2">
                            <FormLabel>Locations</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter locations"
                                value={locationInput}
                                onChange={(e) => setLocationInput(e.target.value)}
                            />
                            <Button
                                bgColor='rgb(238,120,107)'
                                size="sm"
                                onClick={handleAddLocation}
                                marginTop={2}
                                color='white'
                                mb={5}
                            >
                                Add Location
                            </Button>
                        </Box>
                        <Flex flexWrap="wrap">
                        {locations.map((location, index) => (
                            <Tag
                            key={index}
                            size="md"
                            borderRadius="full"
                            variant="solid"
                            bgColor='#2A9FB9'
                            mr="2"
                            mb="2"
                            p={2}
                            >
                            <TagLabel>{location}</TagLabel>
                            <TagCloseButton onClick={() => handleRemoveLocation(location)} />
                            </Tag>
                        ))}
                        </Flex>
                    </Box>
                </SimpleGrid>
                <Flex justifyContent="center" marginTop="5">
                <Button
                    bgColor='rgb(238,120,107)'
                    width='30%'
                    color='white'
                    onClick={handlePost}
                    sx={{'_hover': {backgroundColor: '#E2E8F0', color: '#2A9FB9'}}}
                >
                    Post Job
                </Button>
                </Flex>
            </FormControl>
        </CardBody>
    </Card>
  )
}

export default JobPostForm