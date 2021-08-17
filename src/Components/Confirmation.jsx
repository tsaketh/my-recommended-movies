import React from 'react';
import 'tachyons';

const Confirmation = ({legend, label, onConfirmation}) => {
    return (
        <div style={{backgroundColor: 'lightseagreen', padding: '5px', borderRadius: '5px'}}>
            <legend className="f4 fw6 ph0 mh0 center black-80">{legend}</legend>
            <br></br>
            <label className="db fw6 lh-copy f6 black-80" htmlFor="user-name">{label}</label>
            <div className="flex justify-end mt3">
                <input 
                    className="b ph3 pv2 input-reset ba b--black bg-light-blue grow pointer f6 dib" 
                    type="submit" 
                    value="Confirm" 
                    onClick={onConfirmation}
                    />
            </div>
        </div>
    )
}

export default Confirmation;