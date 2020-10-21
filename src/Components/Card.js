import React from 'react';
import 'tachyons';
// import Tooltip from './Tooltip';
// import ReactStars from 'react-rating-stars-component';
import customer from './customer.png'

const Card = ({Id, Title, rating, ratings, Year, Genre, onMovieClick, routeChange}) => {
    const Genretemp = Genre
    if (Title.match(/^[/"][0-9a-zA-Z:. ]+,[0=9a-zA-Z:. ]+[/"]$/) !== null) {
        Title= Title.slice(1,-1).split(', ')[1]+' '+Title.slice(1,-1).split(', ')[0]
    }
    const Titletemp = Title
    if (Title.length >=10) {
        Title = Title.slice(0, 8)+'...'
    }
    if (Genre.length >=20) {
        Genre = Genre.slice(0,17)+'...'
    }      
    return (
        <div className= 'tc bg-light-green dib my-card br3 pa3 ma2 grow bw2 shadow-5 pointer'
            id={`main_${Id}`}
            onClick={()=>{onMovieClick({
                'Id': Id, 
                'Title': Titletemp, 
                'rating': rating, 
                'ratings': ratings, 
                'Year': Year, 
                'Genre': Genretemp
            })
            routeChange('similarmovies')}}>
            <div id={`sub_${Id}`}>
                {/* <Tooltip classes='f2 bold' 
                    title={Title}
                    tip={Titletemp}
                /> */}
                {/* <Tooltip hover={hover} tip={Titletemp}/> */}
                <h2 id={`title_${Id}`}>{ Title }</h2>
                <p id={`year_${Id}`}>{ Year }</p>
                <p id={`genre_${Id}`}>{ Genre }</p>
                <div className = 'flex justify-between' id={`sub2_${Id}`}>
                    <div className='flex justify-start justify-items-center pa2 ' id={`sub3_${Id}`}>
                        {/* <ReactStars count={5}
                            onChange={(rate)=>{this.setState({rating:rate})}}
                            size={15}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className='fa fa-star-half-alt'></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor='#ffd700'
                            value={rating}/> */}
                        <span className='f7 pt' id={`rating_${Id}`}>{rating}</span>
                    </div>
                    <div className='flex justify-end justify-items-center pa2' id={`sub4_${Id}`}>
                        <img id={`icon_${Id}`} src={customer} alt="" height='15px' width='auto'/>
                        <span id={`ratings_${Id}`} className='f7 pt pl1'>{ratings}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;