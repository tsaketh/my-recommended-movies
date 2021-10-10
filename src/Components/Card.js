import React from 'react';
import 'tachyons';
import Tooltip from './Tooltip';
import customer from './customer.png'
import { Link } from 'react-router-dom';

const Card = ({Id, Title, rating, ratings, Year, Genre, onMovieClick, routeChange}) => {
    if (Title.match(/^[/"][0-9a-zA-Z:. ]+,[0=9a-zA-Z:. ]+[/"]$/) !== null) {
        Title= Title.slice(1,-1).split(', ')[1]+' '+Title.slice(1,-1).split(', ')[0]
    }
    return (
        <Link to={`/movie/${Id}`}>
            <div key={Id} className= 'tc bg-light-green dib my-card br3 pa3 ma2 grow bw2 shadow-5 pointer'
                id={`main_${Id}`}>
                <div id={`sub_${Id}`}>
                    <Tooltip tip={Title}>
                        <h2 className="text-ellipsis"
                            id={`title_${Id}`}>
                            {Title}
                        </h2>
                    </Tooltip>
                    <p id={`year_${Id}`}>{ Year }</p>
                    <Tooltip tip={Genre}>
                        <p className="text-ellipsis"
                            id={`genre_${Id}`}>
                            {Genre}
                        </p>
                    </Tooltip>
                    <div className = 'flex justify-between' id={`sub2_${Id}`}>
                        <div className='flex justify-start justify-items-center pa2 ' id={`sub3_${Id}`}>
                            <span className='f7 pt' id={`rating_${Id}`}>{rating}</span>
                        </div>
                        <div className='flex justify-end justify-items-center pa2' id={`sub4_${Id}`}>
                            <img id={`icon_${Id}`} src={customer} alt="" height='15px' width='auto'/>
                            <span id={`ratings_${Id}`} className='f7 pt pl1'>{ratings}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Card;