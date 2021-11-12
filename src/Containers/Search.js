import React, { Component } from 'react';
import CardContainer from '../Containers/CardContainer';
import '../App.css';
import Scroll from '../Components/Scroll';
import Searchbar from '../Components/Searchbar';
import { RESOURCE_API_LOCAL } from '../Constants';

class Search extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    loadResults=()=>{
        if (this.state.searchfield.length>=3) {
            fetch(`${RESOURCE_API_LOCAL}search/${this.state.searchfield}`)
            .then(response => response.json())
            .then(users => this.setState({robots: users.results}))
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
                    <CardContainer movies = {this.state.robots} classes = 'tc dib'/>
                </Scroll>}
            </div>
        )
    }
}

export default Search;