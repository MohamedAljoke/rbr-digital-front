'use server';
import { redirect } from 'next/navigation';
import { EmployeesDTO } from '../DTO/employees_dto';
import { employeeObjectSchema } from '../schemas/employees_schema';
import { routesName } from '@/helpers/routes_names';
import { revalidatePath, revalidateTag } from 'next/cache';
import { tagsNames } from '@/helpers/tags_names';

const baseUrl = 'http://localhost:8000/api';

export const fetchEmployees = async (): Promise<EmployeesDTO[]> => {
  try {
    const res = await fetch(`${baseUrl}/employees`, {
      next: { tags: [tagsNames.LIST_EMPLOYEES] },
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error('Database Error:', error);
    //todo:feedback error
    return [];
  }
};
export const fetchEmployeeById = async (
  id: string
): Promise<EmployeesDTO | undefined> => {
  try {
    const res = await fetch(`${baseUrl}/employees/${id}`, {
      next: { tags: [tagsNames.EMPLOYEE, id] },
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error('Database Error:', error);
    return undefined;
  }
};

export type CreateEmployeeErrorState = {
  errors?: {
    name?: string[];
    position?: string[];
    department?: string[];
    admissionDate?: string[];
  };
  message?: string | null;
};
export const addEmployees = async (
  prevState: CreateEmployeeErrorState,
  formData: FormData
) => {
  const validatedEmployee = employeeObjectSchema.safeParse({
    name: formData.get('name'),
    position: formData.get('position'),
    department: formData.get('department'),
    admissionDate: formData.get('admissionDate'),
  });
  if (!validatedEmployee.success) {
    return {
      errors: validatedEmployee.error.flatten().fieldErrors,
      message: 'Erro na criação do funcionário',
    };
  }
  const bodyParam = validatedEmployee.data;
  try {
    const response = await fetch(`${baseUrl}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyParam),
    });
    if (response.status === 409) {
      console.log(response);
      return {
        message: 'Usuário já cadastrado',
      };
    }
  } catch (error) {
    return {
      message: 'Erro no server tente novamente mais tarde',
    };
  }
  revalidateTag(tagsNames.LIST_EMPLOYEES);
  redirect(routesName.employees.list);
};
export const updateEmployees = async (
  prevState: CreateEmployeeErrorState,
  formData: FormData
) => {
  const id = formData.get('id');
  const validatedEmployee = employeeObjectSchema.safeParse({
    name: formData.get('name'),
    position: formData.get('position'),
    department: formData.get('department'),
    admissionDate: formData.get('admissionDate'),
  });
  if (!validatedEmployee.success) {
    return {
      errors: validatedEmployee.error.flatten().fieldErrors,
      message: 'Erro na criação do funcionário',
    };
  }
  const bodyParam = validatedEmployee.data;
  try {
    const response = await fetch(`${baseUrl}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyParam),
    });
    console.log('akak', id, response);
    if (response.status === 409) {
      console.log(response);
      return {
        message: 'Usuário já cadastrado',
      };
    }
  } catch (error) {
    return {
      message: 'Erro no server tente novamente mais tarde',
    };
  }
  revalidateTag(tagsNames.LIST_EMPLOYEES);
  revalidateTag(tagsNames.EMPLOYEE);
  redirect(routesName.employees.list);
};

export async function deleteEmployee(employeeId: string) {
  try {
    await fetch(`${baseUrl}/employees/${employeeId}`, {
      method: 'DELETE',
    });
    revalidateTag(tagsNames.LIST_EMPLOYEES);
  } catch (error) {}
}
