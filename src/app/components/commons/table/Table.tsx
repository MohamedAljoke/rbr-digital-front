'use client'
import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  ChakraProvider,
} from '@chakra-ui/react'

interface ICustomTableParams {
  headers: string[];
  tableContent: (string | JSX.Element | number)[][];
}
export default function CustomTable({ headers, tableContent }: ICustomTableParams) {
  return (
    <ChakraProvider>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              {
                headers.map((header, idx) => {
                  return <Th key={idx}>
                    {header}
                  </Th>
                })
              }
            </Tr>
          </Thead>
          <Tbody>
            {
              tableContent.map((contentItem, idx) => {
                return (
                  <Tr key={idx}>
                    {contentItem.map((cell, cellIndex) => (
                      <Td key={cellIndex}>{cell}</Td>
                    ))}
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </ChakraProvider>
  )
}
