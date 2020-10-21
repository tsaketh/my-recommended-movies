import React from 'react';

const Scroll = (props) => {
    return (
        <div
            style={{overflow: 'auto', 
                    border: '3px solid black', 
                    height: '800px'}}>
                {props.children}
        </div>
    )
}

export default Scroll;