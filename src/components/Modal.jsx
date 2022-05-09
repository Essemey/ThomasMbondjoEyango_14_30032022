import '../styles/components/Modal.css'
import { Cross } from './icons/CrossIcon'
import PropTypes from 'prop-types'
import { Children } from 'react'

export function Modal({ visible, setVisible, title, style, children }) {

    const modalStyle = { ...style }


    return visible ?
        <div className="modal_background">
            <div className="modal" style={modalStyle}>
                <header className="modal_header">
                    <h2>{title}</h2>
                </header>
                <div className="modal_body">
                    {children}
                </div>
                <div className="modal_close_container" onClick={() => setVisible(false)}><Cross className="modal_close" /></div>
            </div>
        </div>
        : null
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    title: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired
}