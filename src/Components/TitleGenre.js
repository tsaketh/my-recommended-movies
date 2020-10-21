import React from 'react';

const TitleGenre = ({routeChange, genre, genreChange, navigation, route}) => {
    return (
        <div className='flex justify-between pl3 pr3 tc'>
            <h2>{genre}</h2>
            <p className='link f6 blue dim dib pointer'
                id={genre} 
                onClick={()=> {
                    routeChange(route)
                    genreChange(genre)
                }}>{navigation}</p>
        </div>
    )
}
export default TitleGenre;