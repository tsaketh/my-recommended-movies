import React from 'react';
import Genremovies from './Genremovies';
import customer from '../Components/customer.png';

const Viewmovieinfo = ({movie, routeChange, genreChange, onMovieClick, userId, isSignedIn}) => {
    return (
        <div>
            <div className= 'tc bg-light-green br3 pa3 ma2 bw2 shadow-5'
                id={movie.Id}>
                <div>
                    {/* <Tooltip classes='f2 bold' 
                        title={Title}
                        tip={Titletemp}
                    /> */}
                    {/* <Tooltip hover={hover} tip={Titletemp}/> */}
                    <div className='flex justify-between'>
                        <p className="f6 dib black-80 bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--black-20 pointer"
                            onClick={()=>{
                                routeChange('home')
                            }}>Back to Home</p>
                        <h2>{ movie.Title }</h2>
                        <p className="f6 dib black-80 bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--black-20 pointer"
                            onClick={()=>{
                                routeChange('rate')
                            }}>Rate movie</p>
                    </div>
                    <p>{ movie.Year }</p>
                    <p>{ movie.Genre }</p>
                    <div className = 'flex justify-between'>
                        <p>{movie.rating}</p>
                        <div className='flex justify-end justify-items-center pa2'>
                            <img src={customer} alt="" height='20px' width='auto'/>
                            <span className='pt pl1'>{movie.ratings}</span>
                        </div>
                    </div>
                    {/* <div className = 'flex justify-center'> 
                        <p className="f6 dib black-80 bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--black-20 pointer">Rate movie</p>
                    </div> */}
                </div>
            </div>
            <Genremovies userId={userId} 
                genre={'Similar to '+movie.Title} 
                routeChange={routeChange} 
                genreChange={genreChange} 
                movieId={movie.Id}
                onMovieClick={onMovieClick}
                isSignedIn={isSignedIn}/>        
        </div>
    );
}

export default Viewmovieinfo;