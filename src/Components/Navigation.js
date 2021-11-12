import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MYprofile from './MYprofile.png';

const Navigation = ({isSignedIn, userType, route, userAuth, avatarId}) => {
    const location = useLocation()
    return (
        <nav className="flex-grow pa flex items-center justify-end bb b--white-10 bg-black my-top">
            {(route!=='home')?
                <Link to='/'>
                    <p className="f6 link dib white dim mr3 mr4-ns pointer">Home</p>
                </Link>
                :<></>}
            {(route!=='search')?
                <Link to='/search'>
                    <p className="f6 link dib white dim mr3 mr4-ns pointer">Search</p>
                </Link>
                :<></>}
            {(userType==='Admin' && isSignedIn && route!=='admin')?
                <Link to='/users'>
                    <p className="f6 link dib white dim mr3 mr4-ns pointer">Admin</p>
                </Link>
                :<></>}
            {(!isSignedIn)?
                <Link to={{pathname: "/signin", state: {from: (location.pathname !== "/signup" && location.pathname) || (location.state?.from || "/")}}}>
                    <p className="f6 link dib white dim mr3 mr4-ns pointer">Sign In</p>
                </Link>
                :<></>}
            {(!isSignedIn)?
                <Link to={{pathname: "/signup", state: {from: (location.pathname !== "/signin" && location.pathname) || (location.state?.from || "/")}}}>
                    <p className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer">Sign Up</p>
                </Link>
                :<></>}
            {(isSignedIn)?
                <p onClick={()=>{
                    userAuth(false)
                }}
                className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                >Sign Out</p>
                :<></>}
            {(isSignedIn && route!=='profile')?
                <Link to='/generalinformation'>
                    <div className="mh3 mt3 mb2">
                        <img className="my-profile pointer" src={(avatarId)?`https://robohash.org/${avatarId}?set=set2&size=30x30`:MYprofile} alt="" width="30px" height="30px"
                            />
                    </div>
                </Link>
                :<></>}
        </nav>
    ) 
}

export default Navigation;