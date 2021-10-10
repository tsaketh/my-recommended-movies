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
      isSignedIn: false,
      user: {}
    }
  }
  userAuth =(value)=>{
    this.setState({isSignedIn:value})
    if(!value){
      this.setState({user: {}})
    }
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
                />
    })
    return(
      <div>
        {this.state.isSignedIn?<Redirect to={this.props.location.state?.from || ((this.props.location?.pathname !== "/signin" && this.props.location?.pathname !== "/signup") && this.props.location?.pathname) || '/'}/>:<></>}
        <Switch>
          <Route exact path="/movie/:movieId">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route='movie' userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Viewmovieinfo userId={this.state.user.id} isSignedIn={this.state.isSignedIn}
              />
          </Route>
          <Route exact path="/signin">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="signin" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <SignIn getUser={this.getUser} userAuth={this.userAuth}/>
          </Route>
          <Route exact path="/signup">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="signup" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Register getUser={this.getUser} userAuth={this.userAuth}/>
          </Route>
          <Route exact path="/search">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="search" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Search/>
          </Route>
          <Route exact path="/movies">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="admin" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Admin activeOption="Movies" user={this.state.user}/></>}
          </Route>
          <Route exact path="/users">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="admin" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Admin activeOption="Users" user={this.state.user}/></>}
          </Route>
          <Route exact path="/generalinformation">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="profile" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Profile user={this.state.user} getUser={this.getUser} activeOption="General Information"/></>}
          </Route>
          <Route exact path="/settings">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="profile" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Profile user={this.state.user} getUser={this.getUser} activeOption="Settings"/></>}
          </Route>
          <Route exact path="/">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="home" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <div>
              {moviedivs}
            </div>
          </Route>
          <Route exact path={"/:genre"}>
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="genre" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <ViewallGenre userId={this.state.user.id}
                        isSignedIn={this.state.isSignedIn}
                        />
          </Route>
          <Route exact path={"/similarmovies/:similartomovieId"}>
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="similarmovies" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <ViewallGenre userId={this.state.user.id}
                        isSignedIn={this.state.isSignedIn}
                        />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
