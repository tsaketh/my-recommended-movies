import React from 'react';
import { Component } from 'react';
import CardContainer from './CardContainer';
import TitleGenre from '../Components/TitleGenre';
import ErrorHandler from '../Components/ErrorHandler';

class ViewallGenre extends Component {
    constructor(){
        super()
        this.state={
            genredmovies:[]
        }
    }
    componentDidMount() {
        if (this.props.genre === 'popularmovies') {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/${this.props.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies}))
        } else if(this.props.genre === 'recommendations') {
            if (!this.props.isSignedIn) {
                this.setState({genredmovies:"Please login and rate some movies to get recommendations"})
            } else {
                fetch(`https://ts-recommender-api-11798.herokuapp.com/${this.props.genre}/${this.props.userId}`)
                .then(response => response.json())
                .then(movies => this.setState({genredmovies:movies}))
            }
        } else if(this.props.genre.slice(0,10)==='Similar to') {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/similarmovies/${this.props.movieId}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies}))
        }  else {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/movies/${this.props.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies.results}))
        }
    }
    render(){
    return(
        <div>
            <TitleGenre routeChange={this.props.routeChange} 
                genre={this.props.genre} 
                genreChange={this.props.genreChange} 
                navigation={'Back'} 
                route={(this.props.genre.slice(0,10)==='Similar to')?'similarmovies':'home'}
            />
            {(this.state.genredmovies[0]==="Please rate the movies as per your interest to start seeing the movies recommended by our system"||
                this.state.genredmovies[0] === "No sufficient ratings" ||
                this.state.genredmovies === "Please login and rate some movies to get recommendations")
                ?<ErrorHandler movies={this.state.genredmovies}/>:<div className="my-v-scroll"><CardContainer movies = {this.state.genredmovies} classes = 'tc dib' onMovieClick={this.props.onMovieClick}
                routeChange={this.props.routeChange}/></div>}
        </div>
    )}
}
export default ViewallGenre;