import React from 'react';
import MYprofile from './MYprofile.png';

const Navigation = ({isSignedIn, userType, route, routeChange, userAuth, avatarId}) => {
    return (
        <nav className="flex-grow pa flex items-center justify-end bb b--white-10 bg-black my-top">
            {/* <img className='bg-white' src={icon} alt="" /> */}
            {(route!=='home')?<p 
                onClick={()=>{routeChange('home')}}
                className="f6 link dib white dim mr3 mr4-ns pointer" 
                >Home</p>:<></>}
            {(route!=='search')?<p 
                onClick={()=>{routeChange('search')}}
                className="f6 link dib white dim mr3 mr4-ns pointer" 
                >Search</p>:<></>}
            {(userType==='Admin' && isSignedIn && route!=='admin')?<p 
                onClick={()=>{routeChange('admin')}}
                className="f6 link dib white dim mr3 mr4-ns pointer" 
                >Admin</p>:<></>}
            {(!isSignedIn)?<p 
                onClick={()=>{routeChange('signin')}}
                className="f6 link dib white dim mr3 mr4-ns pointer" 
                >Sign In</p>:<></>}
            {(!isSignedIn)?<p 
                onClick={()=>{routeChange('signup')}}
                className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                >Sign Up</p>:<></>}
            {(isSignedIn)?<p 
                onClick={()=>{
                    userAuth(false)
                    routeChange('signin')
                }}
                className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                >Sign Out</p>:<></>}
            {(isSignedIn && route!=='profile')
                ?<div className="mh3 mt3 mb2">
                    <img className="my-profile pointer" src={(avatarId)?`https://robohash.org/${avatarId}?set=set2&size=30x30`:MYprofile} alt="" width="30px" height="30px"
                        onClick = {()=>routeChange('profile')}/>
                </div>
                :<></>}
        </nav>
    ) 
}

export default Navigation;