import zod, { object, string, TypeOf } from 'zod';

export const employeeObjectSchema = object({
  name: zod
    .string()
    .min(1, { message: 'Campo necessário' })
    .max(254, { message: 'Campo longo' }),
  position: zod
    .string()
    .min(1, { message: 'Campo necessário' })
    .max(254, { message: 'Campo longo' }),
  department: zod
    .string()
    .min(1, { message: 'Campo necessário' })
    .max(254, { message: 'Campo longo' }),
  admissionDate: zod
    .string()
    .min(1, { message: 'Campo necessário' })
    .max(254, { message: 'Campo longo' }),
});

export type EmployeesInput = TypeOf<typeof employeeObjectSchema>;
