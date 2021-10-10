import React, {Component} from  'react';
import { Link, withRouter } from 'react-router-dom';
import Validations from '../Components/Validations';

class SignIn extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            errors: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    authenticateUser = () =>{
        this.setState({errors: ""});
        fetch("https://floating-reaches-01708.herokuapp.com/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(Response => {
            return Response.json();
        }).then(data => {
            if (data === "Invalid Email or Password" ||
                data === "Error Logging in. Please check your network and try again") {
                this.setState({errors: data});
            } else {
                this.props.getUser(data);
                this.props.userAuth(true);
            }
        }).catch(alert);
    }
    render(){
        const {location} = this.props;
        return (
            <article className="br2 ba bg-light-green dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" name="email-address"  id="email-address" 
                                    onChange = {this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" name="password"  id="password" 
                                    onChange = {this.onPasswordChange}/>
                            </div>
                            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
                        </fieldset>
                        <Validations errors = {this.state.errors}/>
                        <div className="my-center flex justify-between mt3">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                                onClick={this.authenticateUser}/>
                            <Link to={{pathname: "/signup", state: {from: (location.pathname !== "/signin" && location.pathname) || (location.state?.from || "/")}}}>
                                <p 
                                    className="f6 link dim black db pointer">Sign up</p>
                            </Link>
                        </div>
                        {/* <div className="lh-copy mt3 my-center">
                            <p 
                                className="f6 link dim black db pointer"
                                onClick={()=>{onRouteChange('signup')}}>Sign up</p> */}
                            {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                        {/* </div> */}
                    </div>
                </main>
            </article>
        )
    }
    
}

export default withRouter(SignIn);