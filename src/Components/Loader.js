import React from 'react';
import loading from './loading.png'

const Loader = ()=> {
    return (
        <div >
            <img className='my-spin-loader' src={loading} alt="" width='70px' height='70px'/>
        </div>
    )
}
export default Loader;