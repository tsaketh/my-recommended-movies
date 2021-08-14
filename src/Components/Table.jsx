import React from 'react';
import 'tachyons';

const Table = ({contents}) => {
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
            <tr key={Object.hasOwnProperty.call(obj, 'name')?obj.name:obj.Id} className="table-contents">
                {cols}
                {/* <td className="table-row-options" style={{padding: '5px'}}>...</td> */}
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