import { Children, useMemo, useRef, useState, useEffect } from "react"
import { ArrowIcon } from '../icons/ArrowIcon'
import '../../styles/components/Menu.css'
import { PopUp } from "./PopUp"


export function Menu({ name, id, children }) {

    const options = useMemo(() => Children.toArray(children), [])

    const defaultOption = () => {
        const defaultSelected = options.filter(option => (Object.entries(option.props).find(prop => prop[0] === 'defaultValue' && prop[1] === true)))
        if (!defaultSelected.length) {
            return options[0]
        }
        return defaultSelected[0]
    }

    const [menu, setMenu] = useState({ value: defaultOption().props.children, isOpen: false, hover: defaultOption().key })

    const selectMenu = useRef()

    useEffect(() => {
        selectMenu.current.value = menu.value
    }, [menu.value])

    const closeMenu = () => menu.isOpen && setMenu(s => ({ ...s, isOpen: false }))

    useEffect(() => {

        window.removeEventListener('click', closeMenu)
        window.addEventListener('click', closeMenu)

        return () => {
            window.removeEventListener('click', closeMenu)
        }

    }, [menu.isOpen])

    return <div className="menu">
        <div className="textBox" onClick={() => setMenu(s => ({ ...s, isOpen: !s.isOpen }))}>
            <p>{menu.value}</p>
            {!menu.isOpen ? <ArrowIcon className="dropdown_icon_inverse" /> : <ArrowIcon className="dropdown_icon" />}
        </div>
        {menu.isOpen && <PopUp content={options} menu={menu} setMenu={setMenu} />}
        <select name={name} id={id} ref={selectMenu} style={{ display: 'none' }}>
            {options.map(option => option)}
        </select>
    </div>
}