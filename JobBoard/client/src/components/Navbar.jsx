'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
  Link,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import {MdWork} from 'react-icons/md'
import {FaDiceD6, FaBuilding} from 'react-icons/fa'
import {ImSearch} from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

const Links = ['Jobs', 'Companies', 'Profile']

const NavLink = (props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={3}
      py={1}
      rounded={'3xl'}
      _hover={{
        textDecoration: 'none',
        textColor: 'rgb(238,122,109)',
        bg: useColorModeValue('rgb(255, 238, 234)', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate();

  const handleClick=()=>{
      navigate('/CompanyDashboard')
  }
  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Icon as={ImSearch} color='rgb(238,122,109)' mr={2} />
              <Text as='b' fontSize={'xl'}>
                <a href='/'>JobSearch</a>
              </Text>
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink>
                <Icon as={MdWork} color='rgb(238,122,109)' mr={2}/>
                Jobs
              </NavLink>
              <NavLink>
                <Icon as={FaBuilding} color='rgb(238,122,109)' mr={2}/>
                Companies
              </NavLink>
              <NavLink>
                <Icon as={FaDiceD6} color='rgb(238,122,109)' mr={2}/>
                Profile
              </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              bgColor= 'rgb(238,120,107)'
              color= 'white'
              size={'sm'}
              mr={4}
              >
              Signup
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                display={'flex'}
                flexDirection={'row'}
                >
                <Avatar
                  size={'sm'}
                  src={
                    'https://bit.ly/broken-link'
                  }
                  name='Khushi Jobanputra'
                  bgColor= 'rgb(238,120,107)'
                  color= 'white'
                  mr={2}
                />
              </MenuButton>
                <Text>Khushi77</Text>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleClick}>Dashboard</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}