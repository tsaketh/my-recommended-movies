import React from 'react';
import Genremovies from './Genremovies';
import customer from '../Components/customer.png';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../Components/Modal';
import Ratemovie from './Ratemovie';
import Toaster from '../Components/Toaster';
import { useEffect } from 'react';
import Loader from '../Components/Loader';
import { RESOURCE_API_LOCAL } from '../Constants';

const Viewmovieinfo = ({userId, isSignedIn, refreshToken}) => {
    const [modalState, setModalState] = useState(false);
    const [toasterState, setToasterState] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [movie, setMovie] = useState({});
    const { movieId } = useParams();
    useEffect(() => {
        fetch(`${RESOURCE_API_LOCAL}movie/${movieId}`)
        .then(res => res.json())
        .then(movie => setMovie(movie[0]))
        .catch(err => console.log)
    }, [movieId])
    const toggleToaster=()=>{
        setToasterState(!toasterState)
        setTimeout(() => {
            setToasterState(false)
        }, 2000);
    }
    return (
        <>
            {(movie==="File not found")
            ?<div className = 'tc' style={{height: '70vh', paddingTop: '22vh'}}>
                <h3 className='f6'>Error 404: File not found</h3>
            </div>
            :(movie.Id)
            ?<div>
                <div className= 'tc bg-light-green br3 pa3 ma2 bw2 shadow-5'
                    id={movie.Id}>
                    <div>
                        <div className='flex justify-between'>
                            <Link to='/'>
                                <p className="f6 dib black-80 bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--black-20 pointer"
                                    >Back to Home</p>
                            </Link>
                            <h2>{ movie.Title }</h2>
                            <p className="f6 dib black-80 bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--black-20 pointer"
                                onClick={()=>{
                                    setModalState(true)
                                }}>Rate movie</p>
                        </div>
                        <p>{ movie.Year }</p>
                        <p>{ movie.Genre }</p>
                        <div className = 'flex justify-between'>
                            <p>{movie.avg}</p>
                            <div className='flex justify-end justify-items-center pa2'>
                                <img src={customer} alt="" height='20px' width='auto'/>
                                <span className='pt pl1'>{movie.ratings}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Genremovies userId={userId} 
                    genre={'Similar to '+movie.Title} 
                    movieId={movieId}
                    isSignedIn={isSignedIn}
                    refreshToken={refreshToken}
                    />   
                <Modal modalState={modalState} toggle={setModalState}>
                    <Ratemovie  Title={movie.Title} movieId={movie.Id} userId={userId} isSignedIn={isSignedIn} toggleModal={setModalState} toggleToaster={toggleToaster} setToastMessage={setToastMessage} refreshToken={refreshToken}/>
                </Modal>
                <Toaster toasterState={toasterState} toggle={toggleToaster} message={toastMessage}/>     
            </div>
            :<Loader/>}
        </>
    );
}

export default Viewmovieinfo;