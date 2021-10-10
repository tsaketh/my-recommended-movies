import React from 'react';
import { Component } from 'react';
import CardContainer from './CardContainer';
import TitleGenre from '../Components/TitleGenre';
import ErrorHandler from '../Components/ErrorHandler';
import { withRouter } from 'react-router-dom';

class ViewallGenre extends Component {
    constructor(){
        super()
        this.state={
            genredmovies:[],
            movieTitle:''
        }
    }
    componentDidMount() {//http://localhost:7909
        if (this.props.match.params.genre === 'popularmovies') {
            fetch(`http://localhost:7909/${this.props.match.params.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies}))
        } else if(this.props.match.params.genre === 'recommendations') {
            if (!this.props.isSignedIn) {
                this.setState({genredmovies:"Please login and rate some movies to get recommendations"})
            } else {
                fetch(`http://localhost:7909/${this.props.match.params.genre}/${this.props.userId}`)
                .then(response => response.json())
                .then(movies => this.setState({genredmovies:movies}))
            }
        } else if(this.props.match.params.similartomovieId) {
            this.getMovieTitle(this.props.match.params.similartomovieId)
            fetch(`http://localhost:7909/similarmovies/${this.props.match.params.similartomovieId}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies}))
        }  else {
            fetch(`http://localhost:7909/movies/${this.props.match.params.genre}`)
            .then(response => response.json())
            .then(movies => this.setState({genredmovies: movies.results}))
        }
    }
    getMovieTitle=(movieId)=>{
        fetch(`http://localhost:7909/movie/${movieId}`)
        .then(res => res.json())
        .then(movie => this.setState({movieTitle: movie[0].Title}))
    }
    render(){
    return(
        <div>
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
        </div>
    )}
}
export default withRouter(ViewallGenre);