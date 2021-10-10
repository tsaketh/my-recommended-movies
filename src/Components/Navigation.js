import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MYprofile from './MYprofile.png';

const Navigation = ({isSignedIn, userType, route, routeChange, userAuth, avatarId}) => {
    const location = useLocation()
    return (
        <nav className="flex-grow pa flex items-center justify-end bb b--white-10 bg-black my-top">
            {/* <img className='bg-white' src={icon} alt="" /> */}
            {(route!=='home')?
                <Link to='/'>
                    <p onClick={()=>{routeChange('home')}} className="f6 link dib white dim mr3 mr4-ns pointer">Home</p>
                </Link>
                :<></>}
            {(route!=='search')?
                <Link to='/search'>
                    <p onClick={()=>{routeChange('search')}} className="f6 link dib white dim mr3 mr4-ns pointer">Search</p>
                </Link>
                :<></>}
            {(userType==='Admin' && isSignedIn && route!=='admin')?
                <Link to='/users'>
                    <p onClick={()=>{routeChange('admin')}} className="f6 link dib white dim mr3 mr4-ns pointer">Admin</p>
                </Link>
                :<></>}
            {(!isSignedIn)?
                <Link to={{pathname: "/signin", state: {from: location.pathname}}}>
                    <p onClick={()=>{routeChange('signin')}} className="f6 link dib white dim mr3 mr4-ns pointer">Sign In</p>
                </Link>
                :<></>}
            {(!isSignedIn)?
                <Link to={{pathname: "/signin", state: {from: "/"}}}>
                    <p onClick={()=>{routeChange('signup')}} className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer">Sign Up</p>
                </Link>
                :<></>}
            {(isSignedIn)?
                <Link to='/signin'>
                    <p onClick={()=>{
                        userAuth(false)
                        routeChange('signin')
                    }}
                    className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                    >Sign Out</p>
                </Link>
                :<></>}
            {(isSignedIn && route!=='profile')?
                <Link to='/generalinformation'>
                    <div className="mh3 mt3 mb2">
                        <img className="my-profile pointer" src={(avatarId)?`https://robohash.org/${avatarId}?set=set2&size=30x30`:MYprofile} alt="" width="30px" height="30px"
                            onClick = {()=>routeChange('profile')}/>
                    </div>
                </Link>
                :<></>}
        </nav>
    ) 
}

export default Navigation;