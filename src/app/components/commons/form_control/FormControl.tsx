
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

interface IFormControlParams {
  id: string
  label?: string
  errorMessage?: string
}
export default function CustomFormControl({ id, label, errorMessage }: IFormControlParams) {
  return (
    <FormControl id={id}>
      <FormLabel className='text-xs'>{label}</FormLabel>
      <Input
        name={id}
        errorBorderColor='crimson'
        type='text' />
      {
        errorMessage ?
          <p className="absolute tex text-xs font-light italic text-alert">{errorMessage}</p> : null
      }
    </FormControl>
  )
}
