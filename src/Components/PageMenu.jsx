import React from 'react';
import 'tachyons';

const PageMenu = ({Options, active, onOptionSelected}) => {
    const opts = Options.map((element)=>{
        let optionStyle = {listStyle: 'none',
            paddingTop: '10px',
            paddingLeft: '10px',
            paddingBottom: '10px',
            borderRadius: '5px'};
        let markerStyle = {width:'5px',
            height: 'auto',
            marginLeft: 'auto',
            backgroundColor: 'green',
            color: 'green', 
            display: 'none'};
        if (element===active) {
            optionStyle.backgroundColor='lightslategray';
            markerStyle.display='inline-block';
        }
        return (
            <li style={optionStyle} className="flex justify-between pointer"
                onClick={()=>{onOptionSelected(element)}} key={element}>
                <span>{element}</span>
                <div style={markerStyle}>|</div>
            </li>
        )
    })
    return(
        <ul style={{width: '15vw',
            height: '90vh', 
            backgroundColor: 'lightseagreen', 
            textAlign: 'left',
            paddingLeft: '0%',
            margin: '0%',
            borderRadius: '5px'}}>
            {opts}
        </ul>
    )
}

export default PageMenu;