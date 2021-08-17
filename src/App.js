import React, { Component } from 'react';
import './App.css';
import 'tachyons';
// import CardContainer from './Containers/CardContainer';
// import Hscroll from './Components/Hscroll';
import Genremovies from './Containers/Genremovies';
import ViewallGenre from './Containers/ViewallGenre';
import Viewmovieinfo from './Containers/Viewmovieinfo';
import Ratemovie from './Containers/Ratemovie';
import Navigation from './Components/Navigation';
import SignIn from './Containers/SignIn';
import Register from './Containers/Register';
import Search from './Containers/Search';
import Table from './Components/Table';
import PageMenu from './Components/PageMenu';
import Admin from './Containers/Admin';
// import Tooltip from './Components/Tooltip';

class App extends Component {
  constructor(){
    super()
    this.state = {
      route:'home', 
      genre: '', 
      movie: {}, 
      isSignedIn: false, 
      user: {}
      // hover: 'false'
    }
  }
  // componentDidMount() {
  //   if (this.props.genre === 'popularmovies') {
  //       fetch(`http://127.0.0.1:6941/${this.props.genre}`)
  //       .then(response => response.json())
  //       .then(movies => this.setState({movies: movies[0]}))
  //   } else if(this.props.genre === 'recommendations') {
  //       fetch(`http://127.0.0.1:6941/${this.props.genre}/${this.props.userId}`)
  //       .then(response => response.json())
  //       .then(movies => this.setState({movies: movies[0]}))
  //   } else {
  //       fetch(`http://127.0.0.1:6941/movies/${this.props.genre}`)
  //       .then(response => response.json())
  //       .then(movies => this.setState({movies: movies[0]}))
  //   }
  // }

  userAuth =(value)=>{
    this.setState({isSignedIn:value})
    if(!value){
      this.setState({user: {}})
    }
  }
  routeChange = (route) => {
    this.setState({route: route})
  }
  genreChange = (genre) => {
    this.setState({genre: genre})
  }
  onMovieClick = (movie) => {
    this.setState({movie: movie})
  }
  getUser = (user) => {
    this.setState({user: user})
  }
  // hoverChange = (value) => {
  //   this.setState(value)
  // }

  render(){
    const genres = ['recommendations', 
                    'popularmovies',
                    'Action', 
                    'Comedy',
                    'Adventure',
                    'Sci-Fi', 
                    'Thriller', 
                    'Horror', 
                    'Drama', 
                    'Mystery'
                  ];
    const moviedivs = genres.map((element) => {
      return <Genremovies userId={this.state.user.id} 
                genre={element} 
                routeChange={this.routeChange} 
                genreChange={this.genreChange}
                onMovieClick={this.onMovieClick}
                isSignedIn={this.state.isSignedIn}
                // hoverChange={this.hoverChange}
                // hover={this.state.hover}
      />
    })
    return(
      <div>
          <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route={this.state.route} routeChange={this.routeChange} userAuth={this.userAuth}/>
          {(this.state.route==='home')
          ?<div>
            {moviedivs}
          </div>
          :(this.state.route==='similarmovies')
              ?<Viewmovieinfo movie={this.state.movie} routeChange={this.routeChange} genreChange={this.genreChange}
                onMovieClick={this.onMovieClick} userId={this.state.user.id} isSignedIn={this.state.isSignedIn}/>
              :(this.state.route==='rate')
                ?<Ratemovie Title={this.state.movie.Title} movieId={this.state.movie.Id} routeChange={this.routeChange} userId={this.state.user.id} isSignedIn={this.state.isSignedIn}/>
                :(this.state.route==='signin')
                  ?<SignIn routeChange={this.routeChange} getUser={this.getUser} userAuth={this.userAuth}/>
                  :(this.state.route==='signup')
                    ?<Register routeChange={this.routeChange} getUser={this.getUser} userAuth={this.userAuth}/>
                    :(this.state.route==='search')
                      ?<Search onMovieClick={this.onMovieClick}
                        routeChange={this.routeChange}/>
                      :(this.state.route==='admin')
                        ?<Admin/>
                        :<ViewallGenre routeChange={this.routeChange} 
                          genre={this.state.genre} 
                          genreChange={this.genreChange}
                          userId={this.state.user.id}
                          onMovieClick={this.onMovieClick}
                          movieId={this.state.movie.Id}
                          isSignedIn={this.state.isSignedIn}
                          // hoverChange={this.hoverChange}
                          // hover={this.state.hover}
                          />
                          }
      </div>
      // <Tooltip classes='f6 pointer' title='This is tit...' tip='This is title with long text complete'/>
      // <Ratemovie Title='movie title here'/>
      // <Table contents={this.state.tableContent}/>
    )
  }
}

export default App;
