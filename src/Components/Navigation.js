import React from 'react';
// import search from './search.png';

const Navigation = ({isSignedIn, route, routeChange, userAuth}) => {
    if (isSignedIn) {
        if (route === 'home') {
            return (
                <nav className="flex-grow pa flex items-center justify-end bb b--white-10 bg-black my-top">
                    {/* <img className='bg-white' src={search} alt="" /> */}
                    <p 
                        onClick={()=>{routeChange('search')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Search</p>
                    <p 
                        onClick={()=>{
                            userAuth(false)
                            routeChange('signin')
                        }}
                        className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                        >Sign Out</p>
                </nav>
            ) 
        } else if(route === 'search') {
            return(
                <nav className="flex-grow pa flex items-center justify-end bb b--white-10 bg-black my-top">
                    <p 
                        onClick={()=>{routeChange('home')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Home</p>
                    <p 
                        onClick={()=>{
                            userAuth(false)
                            routeChange('signin')
                        }}
                        className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                        >Sign Out</p>
                </nav>
            )
        } else {
            return (
                <nav className="flex-grow pa flex items-center justify-end bb b--white-10 bg-black my-top">
                    {/* <img className='bg-white' src={search} alt="" /> */}
                    <p 
                        onClick={()=>{routeChange('search')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Search</p>
                    <p 
                        onClick={()=>{routeChange('home')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Home</p>
                    <p 
                        onClick={()=>{
                            userAuth(false)
                            routeChange('signin')
                        }}
                        className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                        >Sign Out</p>
                </nav>
            ) 
        } 
    } else {
        if(route==='home') {
            return (
                <nav className="flex-grow pa flex items-center justify-end bb b--white-10 bg-black my-top">
                    {/* <img src={search} alt="" height='40px' width='auto' /> */}
                    <p 
                        onClick={()=>{routeChange('search')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Search</p>
                    <p 
                        onClick={()=>{routeChange('signin')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Sign In</p>
                    <p 
                        onClick={()=>{routeChange('signup')}}
                        className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                        >Sign Up</p>
                </nav>
            )
        } else if(route==='search') {
            return (
                <nav className="flex-grow pa flex items-center justify-end bb b--white-10 bg-black my-top">
                    {/* <img src={search} alt="" height='40px' width='auto' /> */}
                    <p 
                        onClick={()=>{routeChange('home')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Home</p>
                    <p 
                        onClick={()=>{routeChange('signin')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Sign In</p>
                    <p 
                        onClick={()=>{routeChange('signup')}}
                        className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                        >Sign Up</p>
                </nav>
            )
        } else {
            return (
                <nav className="flex-grow pa flex items-center justify-end bb b--white-10 bg-black my-top">
                    {/* <img src={search} alt="" height='40px' width='auto' /> */}
                    <p 
                        onClick={()=>{routeChange('search')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Search</p>
                    <p 
                        onClick={()=>{routeChange('home')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Home</p>
                    <p 
                        onClick={()=>{routeChange('signin')}}
                        className="f6 link dib white dim mr3 mr4-ns pointer" 
                        >Sign In</p>
                    <p 
                        onClick={()=>{routeChange('signup')}}
                        className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 pointer" 
                        >Sign Up</p>
                </nav>
            )
        }
    }
}

export default Navigation;