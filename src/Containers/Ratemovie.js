import React from 'react';
import { Component } from 'react';
import { withCookies } from 'react-cookie';
import ReactStars from 'react-rating-stars-component';
import { RESOURCE_API_PROD } from '../Constants';

class Ratemovie extends Component {
    constructor() {
        super()
        this.state={
            rating: 0
        }
    }
    onRateOk(){
        this.props.setToastMessage("Please wait while we record your rating")
        this.props.toggleToaster()
        this.props.refreshToken().then(resolved => {
            fetch(`${RESOURCE_API_PROD}rateMovie?movieId=${this.props.movieId}&rating=${this.state.rating}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.props.cookies.get('id_token')}`
                }
            })
             .then(response => response.json())
             .then(data => {
                 if (data[0]==='Success') {
                     this.props.setToastMessage("Your rating for the movie is recorded")
                     this.props.toggleToaster()
                     this.props.toggleModal(false)
                } else {
                    alert('Unkown Error! Try again after sometime')
                }})
        }).catch(rejected => {
            this.props.setToastMessage("Session expired. Please log out from the browser and login again")
            this.props.toggleToaster()
            this.props.toggleModal(false)
        })
    }
    render(){
        return (
            <div className="br3 bg-light-green bw2 tc justify-center shadow-5 pa3">
                <p className='f4'>How well did you like the movie?</p>
                <p className='f6 mr2'>{ this.props.Title }</p>
                <div className="flex justify-center">
                    <ReactStars count={5}
                        onChange={(rate)=>{this.setState({rating:rate})}}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className='fa fa-star-half-alt'></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor='#ffd700'/>
                </div>
                <div className='flex justify-center'>
                    {(this.props.isSignedIn)?<p className="f6 mr2 dib black-80 bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--black-20 pointer"
                        onClick={()=>{this.onRateOk()}}>Ok</p>:<p></p>}
                    <p className="f6 ml2 dib black-80 bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--black-20 pointer"
                        onClick={()=>{this.props.toggleModal(false)}}>Cancel</p>
                </div>
            </div>
        )
    }
}

export default withCookies(Ratemovie);