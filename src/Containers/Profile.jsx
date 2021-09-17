import React, { Component } from 'react';
import PageMenu from '../Components/PageMenu';
import Actionbutton from '../Components/Actionbutton';
import MYprofile from '../Components/MYprofile.png'

class Profile extends Component {
    constructor(){
        super();
        this.state={
            activeOption: 'General Information',
            displayText: ""
        }
    }
    onOptionSelected=(option)=>{
        this.setState(
            {activeOption: option}
        )
    }
    render(){
        return(
            <div className="flex">
                <PageMenu Options={['General Information', 'Settings']} active={this.state.activeOption} onOptionSelected={this.onOptionSelected}/>
                <div style={{width: '100%', height: '100%'}}>
                    <div className="flex justify-end tc mt3">
                        <Actionbutton action="Edit" takeAction={()=>{this.setState({displayText: "Edited"})}}/>
                    </div>
                    <div>
                        {(this.state.activeOption==='General Information')
                            ?<div className="flex justify-between pa3">
                                <div>
                                    <p>{this.props.user.name}</p>
                                    <p>{this.props.user.email}</p>
                                    <p>{this.props.user.role}</p>
                                </div>
                                <div>
                                <img src={MYprofile} alt="" width="120px" height="120px"/>
                                </div>
                            </div>
                            :<p className="link dim pointer ph3 dark-blue underline">Change Password</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;