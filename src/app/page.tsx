import CustomTable from "./components/commons/table/Table";
import { fetchEmployees } from "@/server/actions/employees_actions";
import Link from "next/link";
import { routesName } from "@/helpers/routes_names";
import DeleteEmployee from "./components/delete_employee/DeleteEmployee";

const employeesHeader = [
  "nome",
  "cargo",
  "departamento",
  "ação"
]

export default async function Employees() {
  const employeesList = await fetchEmployees();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-6 flex items-center">
        <span>Lista dos funcionários</span>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href={routesName.employees.create}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Adicionar funcionário
          </Link>
        </div>
      </div>
      <CustomTable
        headers={employeesHeader}
        tableContent={employeesList?.map(employee => {
          return [
            employee.name,
            employee.position,
            employee.department,
            <div key={employee.id} className="flex gap-2">
              <Link
                href={`${routesName.employees.edit}/${employee.id}`}
                data-open-modal
                className='cursor-pointer'
              >
                <span className="text-indigo-600 hover:text-indigo-900">
                  Edit<span className="sr-only">{employee.name}</span>
                </span>
              </Link>
              <DeleteEmployee id={employee.id} />
            </div>
          ]
        })}
      />
    </main>
  );
}
