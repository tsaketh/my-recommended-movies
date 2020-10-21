import React from 'react';

const Validations = ({errors}) => {
    return (
        <span className="red mb3 bg-black hover-bg-red hover-black f6">{errors}</span>
    )
}
export default Validations;