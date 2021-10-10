import React from 'react';
import { Component} from 'react';
// import Hscroll from '../Components/Hscroll';
import CardContainer from './CardContainer';
import TitleGenre from '../Components/TitleGenre';
import ErrorHandler from '../Components/ErrorHandler';
import { withRouter } from 'react-router-dom';

class Genremovies extends Component {
    constructor(){
        super()
        this.state = {
            movies: []
        }
    }
    componentDidUpdate(prevprops) {//http://localhost:7909
        // console.log('genre: '+this.props.genre+' in didUpdate')
        if(this.props.genre.slice(0,10)==='Similar to'  && this.props.movieId !== prevprops.movieId) {
            // console.log('similar to '+this.props.movieId+ ', genre: '+this.props.genre.slice(0,10))
            fetch(`http://localhost:7909/similarmovies/${this.props.movieId}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
            // .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
        }
    }
    componentDidMount() {
        if (this.props.genre === 'popularmovies') {
           // console.log('genre: '+this.props.genre)
            fetch(`http://localhost:7909/${this.props.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
            .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
        } else if(this.props.genre === 'recommendations') {
            //console.log('genre: '+this.props.genre)
            //console.log(this.props.isSignedIn, this.props.userId)
            if (!this.props.isSignedIn) {
                this.setState({movies:"Please login and rate some movies to get recommendations"})
            } else {
                fetch(`http://localhost:7909/${this.props.genre}/${this.props.userId}`)
                .then(response => response.json())
                .then(movies => this.setState({movies:movies}))
                .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
            }
            //console.log(this.state.movies)
        } else if(this.props.genre.slice(0,10)==='Similar to') {
            // console.log('similar to '+this.props.movieId+ ', genre: '+this.props.genre.slice(0,10))
            fetch(`http://localhost:7909/similarmovies/${this.props.movieId}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
            .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
        } else {
            //console.log('genre: '+this.props.genre)
            fetch(`http://localhost:7909/movies/${this.props.genre}?offset=1&limit=20`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies.results}))
            .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
            //console.log(this.state.movies)
        }
    }
    render() {
        return(
            <div>
                <TitleGenre genre={this.props.genre} 
                    navigation={'See All'} 
                    location={this.props.location}
                    path={this.props.genre.slice(0,10)==="Similar to"?`/similarmovies/${this.props.movieId}`:`/${this.props.genre}`}
                />
                {/* <Hscroll> */}
                {(this.state.movies[0]==="Please rate the movies as per your interest to start seeing the movies recommended by our system"||
                    this.state.movies[0]==="No sufficient ratings" ||
                    this.state.movies==="Please login and rate some movies to get recommendations")
                    ?<ErrorHandler movies={this.state.movies}/>
                    :<CardContainer movies = {this.state.movies}
                    classes = 'my-h-scroll' 
                    genre = {this.props.genre}
                    // hoverChange={this.props.hoverChange} hover={this.props.hover}
                    />}
                {/* </Hscroll> */}
            </div>
        )
    }
}

export default withRouter(Genremovies)