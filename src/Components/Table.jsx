import React, { useState } from 'react';
import 'tachyons';

const Table = ({contents, onOptionClick}) => {
    const [displayOptionFor, setDisplayOptionFor] = useState('');
    const obj = contents[0];
    let arr = [];
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            arr.push(key);
        }
    }
    const cols = arr.map((col) => {
        return <th style={{padding: '5px'}} key={col} className="table-headers-cells">{col}</th>
    })
    const content = contents.map((obj)=>{
        let arr = [];
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                arr.push(element);
            }
        }
        const cols = arr.map((col) => {
            return <td style={{padding: '5px'}} key={col} className="table-cells">{col}</td>
        })
        return(
            <tr key={Object.hasOwnProperty.call(obj, 'id')?obj.id:obj.Id} className="table-contents">
                {cols}
                {(Object.hasOwnProperty.call(obj, 'id'))?<td className="table-row-options" style={{padding: '5px'}}>
                    <div className="pointer dib" onClick={()=>{(displayOptionFor!==obj.id)?setDisplayOptionFor(obj.id):setDisplayOptionFor('')}}>...</div>
                </td>:<></>}
                {(Object.hasOwnProperty.call(obj, 'id') && displayOptionFor===obj.id)?<div style={{position: 'absolute', right: '50px', marginTop: '30px'}}>
                        <span className="pointer" 
                            style={{borderRadius: '5px', backgroundColor: 'lightseagreen', padding: '5px', zIndex: 5}}
                            onClick={()=>{onOptionClick(obj.id, obj.role); setDisplayOptionFor('')}}>{(obj.role==='User')?'Make Admin':'Remove as Admin'}</span>
                    </div>:<></>}
            </tr>
        )
    })
    return(
        <table className="center" style={{borderCollapse: 'collapse', width: '85vw'}}>
            <thead>
                <tr className="table-headers">
                    {cols}
                    {/* <th className="table-row-options"></th> */}
                </tr>
            </thead>
            <tbody>
                {content}
            </tbody>
        </table>
    )
}

export default Table;