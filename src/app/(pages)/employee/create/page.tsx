'use client';
import Link from 'next/link'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import {
  FormErrorMessage,
  ChakraProvider,
} from '@chakra-ui/react'
import { routesName } from '@/helpers/routes_names'
import { addEmployees, CreateEmployeeErrorState } from '@/server/actions/employees_actions';
import ButtonDefault from '@/app/components/commons/buttons/Buttons';
import CustomFormControl from '@/app/components/commons/form_control/FormControl';

export default function CreateEmployee() {
  const initialState = { message: null, errors: {} } as CreateEmployeeErrorState;
  const [state, dispatch] = useFormState(addEmployees, initialState);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div>
        <Link href={routesName.employees.list}>
          <button type="button" className="font-semibold leading-6 text-gray-900 rounded-full bg-[#B396AC] p-2">
            voltar
          </button>
        </Link>
      </div>
      <form
        action={dispatch}
      >
        <ChakraProvider>
          <div className='mt-8'>
            <p>Insira as informações do usuário</p>
            <div
              className='mt-6 flex flex-col gap-4'>
              <CustomFormControl
                id="name"
                label='Nome do funcionário'
                errorMessage={state.errors?.name?.[0]}
              />
              <CustomFormControl
                id="position"
                label='Cargo'
                errorMessage={state.errors?.position?.[0]}
              />
              <CustomFormControl
                id="department"
                label='Departamento'
                errorMessage={state.errors?.department?.[0]}
              />
              <CustomFormControl
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

    </main>
  )
}
function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <ButtonDefault
      type='submit'
      text='Cadastrar'
      disabled={pending}
      aria-disabled={pending}
    />
  );
}