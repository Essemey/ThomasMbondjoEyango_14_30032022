import { DatePicker } from "../components/DatePicker/DatePicker";
import { Menu } from "../components/Menu/Menu";
import { Modal } from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { uid } from "../utils/uid";
import '../styles/pages/index.css'
import PropTypes from 'prop-types';


export default function CreateEmployee({ setEmployee, setPage }) {

    const [visible, setVisible] = useModal()

    const saveEmployee = (e) => {
        e.preventDefault()
        const employee = { ...Object.fromEntries(new FormData(e.target)), id: uid() }
        setEmployee(s => [...s, employee])
        setVisible(true)
    }


    return <div id="home">
        <div className="title">
            <h1>HR<span>net</span></h1>
        </div>
        <div className="container">
            <h2>Create Employee</h2>
            <form onSubmit={saveEmployee} action="#" id="create-employee">
                <div className="formGroup">
                    <div className="inputGroup">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" name="firstName" />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" name="lastName" />
                    </div>
                </div>

                <div className="formGroup">
                    <div className="inputGroup">
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <DatePicker id="date-of-birth" inputName="dateOfBirth" />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="start-date">Start Date</label>
                        <DatePicker id="startDate" inputName="startDate" />
                    </div>
                </div>


                <fieldset className="address">
                    <legend>Address</legend>

                    <div className="inputGroup">
                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" name="street" />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" name="city" />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="state">State</label>
                        <Menu name="state" id="state" >
                            <option>Alabama</option>
                            <option>Alaska</option>
                            <option>Arizona</option>
                            <option>Arkansas</option>
                            <option>California</option>
                            <option>Colorado</option>
                            <option>Connecticut</option>
                            <option>Delaware</option>
                            <option>Florida</option>
                            <option>Georgia</option>
                            <option>Hawaii</option>
                            <option>Idaho</option>
                            <option>IllinoisIndiana</option>
                            <option>Iowa</option>
                            <option>Kansas</option>
                            <option>Kentucky</option>
                            <option>Louisiana</option>
                            <option>Maine</option>
                            <option>Maryland</option>
                            <option>Massachusetts</option>
                            <option>Michigan</option>
                            <option>Minnesota</option>
                            <option>Mississippi</option>
                            <option>Missouri</option>
                            <option>MontanaNebraska</option>
                            <option>Nevada</option>
                            <option>New Hampshire</option>
                            <option>New Jersey</option>
                            <option>New Mexico</option>
                            <option>New York</option>
                            <option>North Carolina</option>
                            <option>North Dakota</option>
                            <option>Ohio</option>
                            <option>Oklahoma</option>
                            <option>Oregon</option>
                            <option>PennsylvaniaRhode Island</option>
                            <option>South Carolina</option>
                            <option>South Dakota</option>
                            <option>Tennessee</option>
                            <option>Texas</option>
                            <option>Utah</option>
                            <option>Vermont</option>
                            <option>Virginia</option>
                            <option>Washington</option>
                            <option>West Virginia</option>
                            <option>Wisconsin</option>
                            <option>Wyoming</option>
                        </Menu>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" name="zipCode" />
                    </div>

                </fieldset>

                <div className="formGroup">
                    <div className="inputGroup">
                        <label htmlFor="department">Department</label>
                        <Menu name="department" id="department">
                            <option>Sales</option>
                            <option defaultValue>Marketing</option>
                            <option>Engineering</option>
                            <option>Human Resources</option>
                            <option>Legal</option>
                        </Menu>
                    </div>
                    <button type="submit" >Save</button>
                </div>
            </form>
            <button className="pageBtn" onClick={() => setPage('employeeList')}>View Current Employees</button>
        </div>
        <Modal visible={visible} setVisible={setVisible}>
            <h1>Employee Created !</h1>
        </Modal>

    </div >
}

CreateEmployee.propTypes = {
    setEmployee: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired
}