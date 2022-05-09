import PropTypes from 'prop-types';

export function PopUp({ content, menu, setMenu }) {

    const className = obj => obj.key === menu.hover ? 'popHover' : ''

    return <ul className="popUp">
        {content.map(obj =>
            <li key={obj.key} className={className(obj)}
                onMouseOver={() => setMenu(s => ({ ...s, hover: obj.key }))}
                onClick={() => setMenu(s => ({ ...s, value: obj.props.children, isOpen: false }))}>
                {obj.props.children}
            </li>
        )}
    </ul>
}

PopUp.propTypes = {
    content: PropTypes.array.isRequired,
    menu: PropTypes.object.isRequired,
    setMenu: PropTypes.func.isRequired
}