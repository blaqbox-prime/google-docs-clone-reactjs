import React from 'react'
import './RoundedButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function RoundedButton({handleClick, hint, icon}) {



    return (
        <div className="RoundedButton d-flex justify-content-center align-items-center">
            {icon && <FontAwesomeIcon className="icons" icon={icon}/>}
            <h4 className="hint">{hint && hint}</h4>
        </div>
    )
}

export default RoundedButton
