'use client';
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import {
  ChakraProvider,
} from '@chakra-ui/react'
import {
  CreateEmployeeErrorState, updateEmployees
} from '@/server/actions/employees_actions';
import ButtonDefault from '@/app/components/commons/buttons/Buttons';
import CustomFormControl from '@/app/components/commons/form_control/FormControl';
import { EmployeesDTO } from '@/server/DTO/employees_dto';

export default async function UpdateEmployeeForm({ employee }: { employee: EmployeesDTO }) {
  const initialState = { message: null, errors: {} } as CreateEmployeeErrorState;
  const [state, dispatch] = useFormState(updateEmployees, initialState);
  if (!employee) {
    return "employee does not exist"
  }
  const handleSubmit = (productData: FormData) => {
    productData.append(`id`, employee.id);
    dispatch(productData);
  };
  return (
    <form
      action={(e) => handleSubmit(e)}
    >
      <ChakraProvider>
        <div className='mt-8'>
          <p>Insira as informações do usuário</p>
          <div
            className='mt-6 flex flex-col gap-4'>
            <CustomFormControl
              defaultValue={employee.name}
              id="name"
              label='Nome do funcionário'
              errorMessage={state.errors?.name?.[0]}
            />
            <CustomFormControl
              defaultValue={employee.position}
              id="position"
              label='Cargo'
              errorMessage={state.errors?.position?.[0]}
            />
            <CustomFormControl
              defaultValue={employee.department}
              id="department"
              label='Departamento'
              errorMessage={state.errors?.department?.[0]}
            />
            <CustomFormControl
              defaultValue={employee.admissionDate}
              id="admissionDate"
              label='data de admissão'
              errorMessage={state.errors?.admissionDate?.[0]}
            />

            <RegisterButton />
          </div>
        </div>
      </ChakraProvider>
      {
        state.message ?
          <p className="absolute tex text-xs font-light italic text-alert">{state.message}</p> : null
      }
    </form>
  )
}
function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <ButtonDefault
      type='submit'
      text='Atualizar'
      disabled={pending}
      aria-disabled={pending}
    />
  );
}