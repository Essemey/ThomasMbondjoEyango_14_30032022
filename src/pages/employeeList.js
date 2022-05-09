import { DataTable, Column } from '@essemey/react-data-table'
import '../styles/pages/employeeList.css'
import PropTypes from 'prop-types';


export default function EmployeeList({ employee, setEmployee, setPage }) {


    return <div className="employeeList">
        <DataTable title="Employees" data={employee} setData={setEmployee}>
            <Column title="First Name" data="firstName" />
            <Column title="City" data="city" />
            <Column title="Last Name" data="lastName" />
            <Column title="Zip Code" data="zipCode" type="number" />
            <Column title="Start Date" data="startDate" type="date" />
            <Column title="Department" data="department" />
            <Column title="Date of Birth" data="dateOfBirth" type="date" />
            <Column title="Street" data="street" />
            <Column title="State" data="state" />
        </DataTable>
        <button className="pageBtn" onClick={() => setPage('createEmployee')}>Add an Employee</button>
    </div>
}


EmployeeList.propTypes = {
    employee: PropTypes.array.isRequired,
    setEmployee: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired
}