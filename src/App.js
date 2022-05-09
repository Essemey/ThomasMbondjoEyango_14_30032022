import { useState } from "react";
import CreateEmployee from "./pages";
import EmployeeList from "./pages/employeeList";



export default function App() {

    const [employee, setEmployee] = useState([])
    const [page, setPage] = useState('createEmployee')


    return page === 'createEmployee' ?
        <CreateEmployee setEmployee={setEmployee} setPage={setPage} />
        :
        <EmployeeList setEmployee={setEmployee} employee={employee} setPage={setPage} />
}