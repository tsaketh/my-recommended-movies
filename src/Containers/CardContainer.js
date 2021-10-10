import React from 'react';
import 'tachyons';
import Card from '../Components/Card';
import Loader from '../Components/Loader';

const CardContainer = ({movies, classes, genre}) => {
    const movieList = movies.map(({Id, Title, Genre, Year, ratings, avg}) => {
        return <Card Id = {Id} Title = {Title} rating = {avg} ratings = {ratings} Year = {Year} Genre = {Genre} 
                    key={Id}
                    // hoverChange={hoverChange} hover={hover}
                />
    });

    return (
        <div>
            {(movies.length>0)?
                <div className={classes} id={genre}>
                    {movieList}
                </div>:<Loader/>}
        </div>
    )
}

export default CardContainer;