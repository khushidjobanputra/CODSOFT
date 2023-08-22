import React from 'react'
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot } from '@chakra-ui/react'

const ListOfApplicants = () => {
  return (
    <div>
        <TableContainer>
        <Table variant='striped' colorScheme='teal'>
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
            <Tr>
                <Th>Applicants Name</Th>
                <Th>JobRole</Th>
                <Th>skills</Th>
                <Th>View Resume</Th>
                <Th>Application</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
            </Tr>
            </Tbody>
        </Table>
        </TableContainer>
    </div>
  )
}

export default ListOfApplicants