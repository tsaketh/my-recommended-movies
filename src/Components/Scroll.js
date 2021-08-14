import React from 'react';

const Scroll = (props) => {
    return (
        <div className='my-v-scroll'>
            {props.children}
        </div>
    )
}

export default Scroll;