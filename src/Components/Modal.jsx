import React from 'react';

const Modal = (props) => {
    return(
        (props.modalState)
        ?<div className="modal">
            <div className="modal-inner br2 ba dark-gray b--black-10 mv6 w-100 mw6 center shadow-5">
                <button className="modal-close-btn bg-transparent pointer"
                    onClick={()=>{props.toggle()}}>X</button>
                {props.children}
            </div>
        </div>
        :""
    )
}

export default Modal;