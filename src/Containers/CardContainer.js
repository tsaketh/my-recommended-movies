import React from 'react';
import 'tachyons';
import Card from '../Components/Card';

const CardContainer = ({movies, classes, onMovieClick, routeChange}) => {
    const movieList = movies.map(({Id, Title, rating, ratings, Year, Genre}) => {
        return <Card Id = {Id} Title = {Title} rating = {rating} ratings = {ratings} Year = {Year} Genre = {Genre} 
                    onMovieClick={onMovieClick} routeChange={routeChange}
                    // hoverChange={hoverChange} hover={hover}
                />
    });

    return (
        <div className={classes}>
            {movieList}
        </div>
    )
}

export default CardContainer;