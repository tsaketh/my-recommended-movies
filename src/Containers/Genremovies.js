import React from 'react';
import { Component} from 'react';
// import Hscroll from '../Components/Hscroll';
import CardContainer from './CardContainer';
import TitleGenre from '../Components/TitleGenre';
import ErrorHandler from '../Components/ErrorHandler';

class Genremovies extends Component {
    constructor(){
        super()
        this.state = {
            movies: []
        }
    }
    componentDidUpdate(prevprops) {
        // console.log('genre: '+this.props.genre+' in didUpdate')
        if(this.props.genre.slice(0,10)==='Similar to'  && this.props.movieId !== prevprops.movieId) {
            // console.log('similar to '+this.props.movieId+ ', genre: '+this.props.genre.slice(0,10))
            fetch(`http://127.0.0.1:7909/similarmovies/${this.props.movieId}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
            // .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
        }
    }
    componentDidMount() {
        //console.log("Entered GenreMovies")
        if (this.props.genre === 'popularmovies') {
           // console.log('genre: '+this.props.genre)
            fetch(`http://127.0.0.1:7909/${this.props.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
            .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
        } else if(this.props.genre === 'recommendations') {
            //console.log('genre: '+this.props.genre)
            //console.log(this.props.isSignedIn, this.props.userId)
            if (!this.props.isSignedIn) {
                this.setState({movies:"Please login and rate some movies to get recommendations"})
            } else {
                fetch(`http://127.0.0.1:7909/${this.props.genre}/${this.props.userId}`)
                .then(response => response.json())
                .then(movies => this.setState({movies:movies}))
                .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
            }
            //console.log(this.state.movies)
        } else if(this.props.genre.slice(0,10)==='Similar to') {
            // console.log('similar to '+this.props.movieId+ ', genre: '+this.props.genre.slice(0,10))
            fetch(`http://127.0.0.1:7909/similarmovies/${this.props.movieId}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
            .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
        } else {
            //console.log('genre: '+this.props.genre)
            fetch(`http://127.0.0.1:7909/movies/${this.props.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
            .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
            //console.log(this.state.movies)
        }
    }
    render() {
        return(
            <div>
                <TitleGenre routeChange={this.props.routeChange} 
                    genre={this.props.genre} 
                    genreChange={this.props.genreChange} 
                    navigation={'See All'} 
                    route={this.props.genre}
                />
                {/* <Hscroll> */}
                {(this.state.movies[0]==="Please rate the movies as per your interest to start seeing the movies recommended by our system"||
                    this.state.movies[0]==="No sufficient ratings" ||
                    this.state.movies==="Please login and rate some movies to get recommendations")
                    ?<ErrorHandler movies={this.state.movies}/>
                    :<CardContainer movies = {this.state.movies}
                    classes = 'my-h-scroll' 
                    onMovieClick = {this.props.onMovieClick}
                    routeChange = {this.props.routeChange}
                    // hoverChange={this.props.hoverChange} hover={this.props.hover}
                    />}
                {/* </Hscroll> */}
            </div>
        )
    }
}

export default Genremovies