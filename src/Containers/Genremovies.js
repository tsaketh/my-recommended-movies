import React from 'react';
import { Component} from 'react';
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
    componentDidUpdate(prevprops) {
        if(this.props.genre.slice(0,10)==='Similar to'  && this.props.movieId !== prevprops.movieId) {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/similarmovies/${this.props.movieId}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
        }
    }
    componentDidMount() {
        if (this.props.genre === 'popularmovies') {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/${this.props.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
            .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
        } else if(this.props.genre === 'recommendations') {
            if (!this.props.isSignedIn) {
                this.setState({movies:"Please login and rate some movies to get recommendations"})
            } else {
                fetch(`https://ts-recommender-api-11798.herokuapp.com/${this.props.genre}/${this.props.userId}`)
                .then(response => response.json())
                .then(movies => this.setState({movies:movies}))
                .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
            }
            //console.log(this.state.movies)
        } else if(this.props.genre.slice(0,10)==='Similar to') {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/similarmovies/${this.props.movieId}`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies}))
            .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
        } else {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/movies/${this.props.genre}?offset=1&limit=20`)
            .then(response => response.json())
            .then(movies => this.setState({movies: movies.results}))
            .catch(e => {alert("Failed to load the data. Please check your internet connection and try again after sometime")})
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
                {(this.state.movies[0]==="Please rate the movies as per your interest to start seeing the movies recommended by our system"||
                    this.state.movies[0]==="No sufficient ratings" ||
                    this.state.movies==="Please login and rate some movies to get recommendations")
                    ?<ErrorHandler movies={this.state.movies}/>
                    :<CardContainer movies = {this.state.movies}
                    classes = 'my-h-scroll' 
                    genre = {this.props.genre}
                    />}
            </div>
        )
    }
}

export default withRouter(Genremovies)