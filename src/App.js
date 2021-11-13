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
import { withCookies, Cookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { USER_API_PROD } from './Constants';

class App extends Component {
  constructor(){
    super()
    this.state = {
      isSignedIn: false,
      user: {}
    }
  }
  userAuth =(value)=>{
    if(!value){
      this.refreshToken().then(resolved => {
        fetch(`${USER_API_PROD}logout`, {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.cookies.get('id_token')}`
          }, 
          body: JSON.stringify({
            refresh_token: this.props.cookies.get('refresh_token')
          })
        }).then(response => response.statusText)
        .then(data => {
          if (data==='OK') {
            this.setState({isSignedIn:value})
            this.setState({user: {}})
            this.props.cookies.remove('id_token')
            this.props.cookies.remove('refresh_token')
            this.props.history.push('/signin')
          }
        })
        .catch(error => {
          alert(`Error while logging out - ${error}`)
        })
      }).catch(rejected => {
        this.setState({isSignedIn:value})
        this.setState({user: {}})
        this.props.history.push('/signin')
      })
    } else {
      this.setState({isSignedIn:value})
    }
  }
  getUser = () => {
    this.refreshToken()
    .then(resolved => {
        fetch(`${USER_API_PROD}user/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.cookies.get('id_token')}`
        }
      })
      .then(res => res.json())
      .then(user => {
        this.setState({user: user})
        this.userAuth(true)
      })
    }).catch(reject => {
      console.log(reject)
      // this.setState({isSignedIn: false})
      // this.props.history.push("/")
    })
  }
  refreshToken=()=>{
    let today = new Date()
    var refreshToken = new Promise((resolve, reject) => {
      if (this.props.cookies.get('id_token')&&(jwtDecode(this.props.cookies.get('id_token')).exp * 1000)-500 < today.getTime()) {
        fetch(`${USER_API_PROD}token`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({
            refresh_token: this.props.cookies.get('refresh_token')
          })
        }).then(res => res.json())
        .then(token => {
          this.props.cookies.set('id_token', token.id_token, {path: '/', maxAge:86400})
          resolve("Token refreshed in cookie")
        })
        .catch(err => {
          if(this.state.isSignedIn) {this.setState({isSignedIn: false})}
          reject(Error("Error while refreshing token in cookie"))
        })
      } else if (this.props.cookies.get('id_token') === undefined || this.props.cookies.get('refresh_token') === undefined) {
        if(this.state.isSignedIn) {this.setState({isSignedIn: false})}
        reject(Error("Cookes expired"))
      } else {
        resolve("Tokens are valid")
      }
    })
    return refreshToken
  }

  componentWillMount(){
    if (this.props.cookies.get('id_token') !== undefined && this.props.cookies.get('refresh_token') !== undefined && !this.state.isSignedIn) {
      this.refreshToken().then(resolved => {this.userAuth(true)}).catch(rejected => {console.log(rejected)})
    } else {
      this.setState({isSignedIn: false})
      // this.props.history.push("/")
    }
  }

  componentDidMount(){
    if (this.props.cookies.get('id_token') !== undefined && this.props.cookies.get('refresh_token') !== undefined) {
      if (!Object.hasOwnProperty.call(this.state.user, 'id')) {
        this.getUser()
      } 
    } else{
      this.setState({isSignedIn: false})
      // this.props.history.push("/")
    }
  }

  componentDidUpdate(prevprops){
    if (prevprops.cookies.get('refresh_token') !== this.props.cookies.get('refresh_token')) {
      if (!this.props.cookies.get('id_token') || !this.props.cookies.get('refresh_token')){
        this.setState({isSignedIn: false})
        // this.props.history.push("/")
      }
    }
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
                refreshToken={this.refreshToken}
                />
    })
    return(
      <div>
        {this.state.isSignedIn?<Redirect to={this.props.location.state?.from || ((this.props.location?.pathname !== "/signin" && this.props.location?.pathname !== "/signup") && this.props.location?.pathname) || '/'}/>:<></>}
        <Switch>
          <Route exact path="/movie/:movieId">
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route='movie' userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Viewmovieinfo userId={this.state.user.id} isSignedIn={this.state.isSignedIn} refreshToken={this.refreshToken}
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
            <Admin activeOption="Movies" user={this.state.user} refreshToken={this.refreshToken}/></>}
          </Route>
          <Route exact path="/users">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="admin" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Admin activeOption="Users" user={this.state.user} refreshToken={this.refreshToken}/></>}
          </Route>
          <Route exact path="/generalinformation">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="profile" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Profile user={this.state.user} getUser={this.getUser} activeOption="General Information" refreshToken={this.refreshToken}/></>}
          </Route>
          <Route exact path="/settings">
            {!this.state.isSignedIn
              ?<Redirect to={{pathname: "/signin", state: {from: this.props.location.pathname}}}/>
              :<><Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="profile" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <Profile user={this.state.user} getUser={this.getUser} activeOption="Settings" refreshToken={this.refreshToken}/></>}
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
                        refreshToken={this.refreshToken}
                        />
          </Route>
          <Route exact path={"/similarmovies/:similartomovieId"}>
            <Navigation isSignedIn={this.state.isSignedIn} userType={this.state.user.role} route="similarmovies" userAuth={this.userAuth} avatarId={this.state.user.avatar_id}/>
            <ViewallGenre userId={this.state.user.id}
                        isSignedIn={this.state.isSignedIn}
                        refreshToken={this.refreshToken}
                        />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(withCookies(App));
