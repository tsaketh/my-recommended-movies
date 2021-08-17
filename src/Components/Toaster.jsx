import React from 'react';
import 'tachyons';

const Toaster = (props) => {
    return(
        (props.toasterState)
        ?<div className="toaster">
            <span className="f6 pa1 white">{props.message}</span>
            <span className="f6 pa1 green pointer"
                onClick={()=>{props.toggle()}}>X</span>
        </div>
        :""
    )
}

export default Toaster;