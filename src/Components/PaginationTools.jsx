import React from 'react';
import 'tachyons';

const PaginationTools = ({totalRecords, pageLimit, onPageSelect, onPageLimitChange, currentPage}) => {
    const numOfPages = Math.ceil(totalRecords/pageLimit);
    const pages = Array.from({length: numOfPages}, (_,i) => i+1);
    const pagenums = pages
                        .filter( page => (page<=currentPage+2 || page<=5)&&(page>=currentPage-2 || page>numOfPages-5))
                        .map( page => <span className="pointer" key={page} style={(page==currentPage)?{padding: '5px', borderRadius: '50%', backgroundColor: 'gray', color: 'white'}:{padding: '5px', borderRadius: '50%'}} onClick={() => {onPageSelect(page)}}>{page}</span>)
    let pageInput = currentPage;
    return(
        <div className="flex justify-between mt2 pa3">
            <div className="flex justify-start">
                <span className="f6 pt1 pr2">Page:</span>
                <input type="number" style={{width: '40px'}}
                defaultValue={pageInput}
                onChange={ event => {
                    if (event.target.value <= numOfPages) {
                        pageInput = event.target.value
                    } else {
                        pageInput = numOfPages
                    }
                }} 
                onKeyPress={ event => {
                    if (event.key === 'Enter') {
                        if (pageInput<=numOfPages) {
                            onPageSelect(pageInput)
                        } else {
                            onPageSelect(numOfPages)
                        }
                    }
                }}/>
                <button className="bg-transparent bn pointer"
                    onClick={() => {onPageSelect(1)}}
                    disabled={currentPage==1}>{"<<"}</button>
                <button className="bg-transparent bn pointer"
                    onClick={() => {onPageSelect(currentPage-1)}}
                    disabled={currentPage==1}>{"<"}</button>
                <div style={{display: 'flex', width: 'fit-content'}} className="ml2 mr2 display-scroll-none">
                    {pagenums}
                </div>
                <button className="bg-transparent bn pointer"
                    onClick={() => {onPageSelect(currentPage+1)}}
                    disabled={currentPage*pageLimit>=totalRecords}>{">"}</button>
                <button className="bg-transparent bn pointer"
                    onClick={() => {onPageSelect(numOfPages)}}
                    disabled={currentPage*pageLimit>=totalRecords}>{">>"}</button>
            </div>
            <div>
                <span className="f6 pt1 pr2">{`${(currentPage-1)*pageLimit+1} - ${(currentPage*pageLimit>totalRecords)?totalRecords:currentPage*pageLimit} of ${totalRecords}`}</span>
                <select name="Numrecords" id="dropdown_num_records" defaultValue={pageLimit} onChange={onPageLimitChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </div>
    )
}

export default PaginationTools;