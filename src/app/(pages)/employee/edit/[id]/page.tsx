import { routesName } from '@/helpers/routes_names'
import { fetchEmployeeById } from '@/server/actions/employees_actions'
import Link from 'next/link'
import UpdateEmployeeForm from './form'

export default async function Page({ params }: { params: { id: string } }) {
  const employee = await fetchEmployeeById(params.id)
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div>
        <Link href={routesName.employees.list}>
          <button type="button" className="font-semibold leading-6 text-gray-900 rounded-full bg-[#B396AC] p-2">
            voltar
          </button>
        </Link>
      </div>
      <UpdateEmployeeForm
        employee={employee}
      />
    </main>
  )
}