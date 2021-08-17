import React from 'react';
import 'tachyons';

const Actionbutton = ({action, takeAction}) => {
    return(
        <span
            style={{backgroundColor: 'lightsteelblue',
                marginTop: 'auto', 
                marginBottom: 'auto', 
                padding: '5px', 
                borderRadius: '5px', 
                fontWeight: '500'}}
            className="pull-right pointer grow"
            onClick={takeAction}
            >{action}</span>
    )
}

export default Actionbutton;