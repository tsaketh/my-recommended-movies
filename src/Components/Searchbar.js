import React from 'react';

const SearchBar = ({searchChange, loadResults}) => {
    return (
        <div className='pa2'>
            <input 
                className='pa3 ba b--green bg-lightest-blue' 
                type="search" 
                placeholder="type and click enter"
                onChange={searchChange}
                onKeyPress={(event)=>{
                    if(event.key==='Enter'){
                        loadResults()
                    }
                }}/>
        </div>
    );
}

export default SearchBar;