'use client'
import React from 'react'
import Trash from '../svg/Trash'
import { deleteEmployee } from '@/server/actions/employees_actions'


interface IDeleteEmployeeParams {
  id: string
}
export default function DeleteEmployee({ id }: IDeleteEmployeeParams) {
  return (
    <div
      onClick={() => {
        deleteEmployee(id)
      }}
      className='hover:cursor-pointer'>
      <Trash />
    </div>
  )
}
