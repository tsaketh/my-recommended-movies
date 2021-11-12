import React from 'react';
import { Component } from 'react';
import CardContainer from './CardContainer';
import TitleGenre from '../Components/TitleGenre';
import ErrorHandler from '../Components/ErrorHandler';
import { withRouter } from 'react-router-dom';
import { RESOURCE_API_LOCAL } from '../Constants';
import { withCookies } from 'react-cookie';

class ViewallGenre extends Component {
    constructor(){
        super()
        this.state={
            genredmovies:[],
            movieTitle:''
        }
    }
    componentDidMount() {
        if (this.props.match.params.genre === 'popularmovies') {
            fetch(`${RESOURCE_API_LOCAL}${this.props.match.params.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies}))
        } else if(this.props.match.params.genre === 'recommendations') {
            this.props.refreshToken().then(resolved => {
                fetch(`${RESOURCE_API_LOCAL}${this.props.match.params.genre}`, {
                    method: "GET",
                    withCrendentials: true,
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${this.props.cookies.get('id_token')}`
                    }
                })
                .then(response => response.json())
                .then(movies => this.setState({genredmovies:movies}))
                .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
            }).catch(rejected => {this.setState({genredmovies:"Please login and rate some movies to get recommendations"})})
        } else if(this.props.match.params.similartomovieId) {
            this.getMovieTitle(this.props.match.params.similartomovieId)
            fetch(`${RESOURCE_API_LOCAL}similarmovies/${this.props.match.params.similartomovieId}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies}))
        }  else {
            fetch(`${RESOURCE_API_LOCAL}movies/${this.props.match.params.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies.results}))
        }
    }
    getMovieTitle=(movieId)=>{
        fetch(`${RESOURCE_API_LOCAL}movie/${movieId}`)
        .then(res => res.json())
        .then(movie => this.setState({movieTitle: (movie[0].Title && movie[0].Title) || movie[0]}))
    }
    render(){
    return(
        <>
            {(this.state.movieTitle==="File not found")
            ?<div className = 'tc' style={{height: '70vh', paddingTop: '22vh'}}>
                <h3 className='f6'>Error 404: File not found</h3>
            </div>
            :<div>
                <TitleGenre genre={this.props.match.params?.genre || `Similar to ${this.state.movieTitle}`} 
                    navigation={'Back'} 
                    location={this.props.location}
                    path="/"
                    />
                {(this.state.genredmovies[0]==="Please rate the movies as per your interest to start seeing the movies recommended by our system"||
                    this.state.genredmovies[0] === "No sufficient ratings" ||
                    this.state.genredmovies === "Please login and rate some movies to get recommendations")
                    ?<ErrorHandler movies={this.state.genredmovies}/>:<div className="my-v-scroll"><CardContainer movies = {this.state.genredmovies} classes = 'tc dib' 
                    genre={this.props.match.params?.genre || `Similar to ${this.state.movieTitle}`}/></div>}
            </div>}
        </>
    )}
}
export default withRouter(withCookies(ViewallGenre));