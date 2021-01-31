import React, { Component } from 'react';
import CardContainer from '../Containers/CardContainer';
import '../App.css';
import Scroll from '../Components/Scroll';
import Searchbar from '../Components/Searchbar';

class Search extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    // componentDidMount(){
    //     if (this.state.searchfield.length>=3) {
    //         fetch(`https://127.0.0.1:7909/search/${this.state.searchfield}`)
    //         .then(response => response.json())
    //         .then(users => this.setState({robots: users}))
    //         .finally(this.setState({searchfieldp:this.state.searchfield}))
    //     }
    // }
    // componentDidUpdate(){
    //     if (this.state.searchfield.length>=3 && this.state.searchfield!==this.state.searchfieldp) {
    //         fetch(`https://127.0.0.1:7909/search/${this.state.searchfield}`)
    //         .then(response => response.json())
    //         .then(users => this.setState({robots: users}))
    //         .finally(this.setState({searchfieldp:this.state.searchfield}))
    //     }
    // }
    loadResults=()=>{
        if (this.state.searchfield.length>=3) {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/search/${this.state.searchfield}`)
            .then(response => response.json())
            .then(users => this.setState({robots: users}))
        }
    }
    onSearch=(event)=>{
        this.setState(
            {searchfield: event.target.value}
        )
    }
    render(){
        return (
            <div className = 'tc'>
                <Searchbar searchChange = {this.onSearch} loadResults={this.loadResults}/>
                {(this.state.robots[0]==="No Results Found")
                    ?<div style={{paddingTop: '22vh'}}>
                        <h3 className='f2'>No Results Found</h3>
                     </div>
                    :(this.state.robots.length===0)
                        ?<div>
                            <h3 className='pa3 f6'>Enter seach text in search bar and press "Enter" to view results</h3>
                        </div>:<Scroll>
                    <CardContainer movies = {this.state.robots} classes = 'tc dib' onMovieClick={this.props.onMovieClick}
                    routeChange={this.props.routeChange}/>
                </Scroll>}
            </div>
        )
    }
}

export default Search;