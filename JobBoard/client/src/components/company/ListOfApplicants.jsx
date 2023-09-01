import React from 'react'
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot, Button } from '@chakra-ui/react'

const ListOfApplicants = ({applicants}) => {

    // console.log(applicants.data)
    
  return (
    <div>
        <TableContainer>
        <Table variant='striped' colorScheme='teal'>
            <Thead>
            <Tr>
                <Th>Applicants Name</Th>
                <Th>JobRole</Th>
                <Th>skills</Th>
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
                            <Td><Button>View Resume</Button></Td>
                            <Td>{applicant.step}</Td>
                        </Tr>
                        </>
                    ))
                }
            </Tbody>
        </Table>
        </TableContainer>
    </div>
  )
}

export default ListOfApplicants