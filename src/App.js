import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import Genremovies from './Containers/Genremovies';
import ViewallGenre from './Containers/ViewallGenre';
import Viewmovieinfo from './Containers/Viewmovieinfo';
import Navigation from './Components/Navigation';
import SignIn from './Containers/SignIn';
import Register from './Containers/Register';
import Search from './Containers/Search';
import Profile from './Containers/Profile';
import Admin from './Containers/Admin';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  constructor(){
    super()
    this.state = {
      route:'home', 
      genre: '', 
      movie: {}, 
      isSignedIn: false, 
      // user: {
      //   id: 680,
      //   name: "test user 6",
      //   email: "test.user6@mail.com",
      //   role: "Admin",
      //   avatar_id: null
      // }
      user: {}
    }
  }
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
                isSignedIn={this.state.isSignedIn}
                key={element}
                // location={this.props.location}
                />
    })
    return(
      <div>
        {this.state.isSignedIn?<Redirect to={this.props.location.state?.from || this.props.location?.pathname}/>:<></>}
        <Switch>
          <Route exact path="/movie/:movieId">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route='movie' routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Viewmovieinfo routeChange={this.routeChange} genreChange={this.genreChange}
              onMovieClick={this.onMovieClick} userId={this.state.user.id} isSignedIn={this.state.isSignedIn}
              // location={this.props.location}
              />
          </Route>
          <Route exact path="/signin">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="signin" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <SignIn routeChange={this.routeChange} getUser={this.getUser} userAuth={this.userAuth}/>
          </Route>
          <Route exact path="/signup">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="signup" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Register routeChange={this.routeChange} getUser={this.getUser} userAuth={this.userAuth}/>
          </Route>
          <Route exact path="/search">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="search" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Search onMovieClick={this.onMovieClick} routeChange={this.routeChange}/>
          </Route>
          <Route exact path="/movies">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="admin" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Admin activeOption="Movies" user={this.state.user}/></>}
          </Route>
          <Route exact path="/users">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="admin" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Admin activeOption="Users" user={this.state.user}/></>}
          </Route>
          <Route exact path="/generalinformation">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="profile" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Profile user={this.state.user} getUser={this.getUser} activeOption="General Information"/></>}
          </Route>
          <Route exact path="/settings">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="profile" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Profile user={this.state.user} getUser={this.getUser} activeOption="Settings"/></>}
          </Route>
          <Route exact path="/">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="home" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <div>
              {moviedivs}
            </div>
          </Route>
          <Route exact path={"/:genre"}>
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="genre" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <ViewallGenre userId={this.state.user.id}
                        isSignedIn={this.state.isSignedIn}
                        />
          </Route>
          <Route exact path={"/similarmovies/:similartomovieId"}>
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="similarmovies" routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <ViewallGenre userId={this.state.user.id}
                        isSignedIn={this.state.isSignedIn}
                        />
          </Route>
        </Switch>
        {/* <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route={this.state.route} routeChange={this.routeChange} userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
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
                      :(this.state.route==='profile')
                        ?<Profile user={this.state.user} getUser={this.getUser}/>
                        :<ViewallGenre routeChange={this.routeChange} 
                        genre={this.state.genre} 
                        genreChange={this.genreChange}
                        userId={this.state.user.id}
                        onMovieClick={this.onMovieClick}
                        movieId={this.state.movie.Id}
                        isSignedIn={this.state.isSignedIn}
                        />
                        } */}
      </div>
    )
  }
}

export default withRouter(App);
