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
            fetch(`http://127.0.0.1:7909/${this.props.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies}))
        } else if(this.props.genre === 'recommendations') {
            if (!this.props.isSignedIn) {
                this.setState({genredmovies:"Please login and rate some movies to get recommendations"})
            } else {
                fetch(`http://127.0.0.1:7909/${this.props.genre}/${this.props.userId}`)
                .then(response => response.json())
                .then(movies => this.setState({genredmovies:movies}))
            }
        } else if(this.props.genre.slice(0,10)==='Similar to') {
            fetch(`http://127.0.0.1:7909/similarmovies/${this.props.movieId}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies}))
        }  else {
            fetch(`http://127.0.0.1:7909/movies/${this.props.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies}))
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
            {(this.state.genredmovies==="Please rate the movies as per your interest to start seeing the movies recommended by our system"||
                this.state.genredmovies === "No sufficient ratings" ||
                this.state.genredmovies === "Please login and rate some movies to get recommendations")
                ?<ErrorHandler movies={this.state.genredmovies}/>:<CardContainer movies = {this.state.genredmovies} classes = 'tc dib' onMovieClick={this.props.onMovieClick}
                routeChange={this.props.routeChange}/>}
        </div>
    )}
}
export default ViewallGenre;