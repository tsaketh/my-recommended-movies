import React from 'react';
import { Link } from 'react-router-dom';

const TitleGenre = ({genre, navigation, location, path}) => {
    return (
        <div className='flex justify-between pl3 pr3 tc'>
            <h2>{genre}</h2>
            <Link to={navigation==="See All"?{pathname: path, state: {from: location.pathname}}:location.state?.from || (location.pathname.split("/")[1]==="similarmovies" && location.pathname.replace("similarmovies", "movie")) ||'/'}>
                <p className='link f6 blue dim dib pointer'
                    id={genre}>{navigation}</p>
            </Link>
        </div>
    )
}
export default TitleGenre;