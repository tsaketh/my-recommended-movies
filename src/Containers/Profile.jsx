import React, { Component } from 'react';
import PageMenu from '../Components/PageMenu';
import Actionbutton from '../Components/Actionbutton';
import MYprofile from '../Components/MYprofile.png'
import Modal from '../Components/Modal';
import EditUserForm from '../Components/EditUserForm';
import Toaster from '../Components/Toaster';
import ChangePasswordForm from '../Components/ChangePasswordForm';
import { USER_API_LOCAL } from '../Constants';
import { withCookies } from 'react-cookie';

class Profile extends Component {
    constructor(){
        super();
        this.state={
            editUserModal: false,
            changePasswordModal: false,
            editName: "",
            editEmail: "",
            editAvatar: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            editUserStatusDisplay: false,
            editUserStatus: "",
            changePasswordStatusDisplay: false,
            changePasswordStatus:"",
            editUserFormValidations: {
                nameErrors: "",
                emailErrors: "",
                serverSideErrors: ""
            },
            changePasswordFormValidations: {
                confirmPasswordError: "",
                errors: ""
            }
        }
    }
    componentDidMount(){
        this.setState(
            {
                editName: this.props.user.name,
                editEmail: this.props.user.email,
                editAvatar: this.props.user.avatar_id
            }
        )
    }
    toggleEditUserPopup=()=>{
        this.setState(
            {
                editUserModal: !this.state.editUserModal, 
                editUserFormValidations: {nameErrors: "", emailErrors: "", serverSideErrors: ""}
            }
        )
    }
    toggleChangePasswordPopup=()=>{
        this.setState(
            {
                changePasswordModal: !this.state.changePasswordModal, 
                changePasswordFormValidations: {confirmPasswordError: "", errors: ""}
            }
        )
    }
    onUserEditFormSubmit=()=>{
        if (this.state.editName.length===0 && this.state.editEmail.length===0) {
            this.setState({editUserFormValidations: {nameErrors: "Name cannot be empty", emailErrors: "Email cannot be empty", serverSideErrors:""}})
        } else if (this.state.editName.length===0 ) {
            this.setState({editUserFormValidations: {nameErrors: "Name cannot be empty", emailErrors: "", serverSideErrors:""}})
        } else if (this.state.editEmail.length===0) {
            this.setState({editUserFormValidations: {nameErrors: "", emailErrors: "Email cannot be empty", serverSideErrors:""}})
        } else if (this.state.editEmail.match(/^[a-zA-Z0-9.]+@([a-zA-Z]+\.[a-zA-Z]{2,})$/) === null) {
            this.setState({editUserFormValidations: {nameErrors:"", emailErrors: "Invalid email address format", serverSideErrors:""}})
        } else {
            this.props.refreshToken().then(resolved => {
                fetch(`${USER_API_LOCAL}update-user?name=${this.state.editName}&email=${this.state.editEmail}&avatar_id=${this.state.editAvatar}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${this.props.cookies.get('id_token')}`
                    }
                })
                .then(res => res.json())
                .then(user => {
                    if (Object.hasOwnProperty.call(user[0], 'id')) {
                        this.props.getUser(user[0])
                        this.setState(
                            {
                                editUserStatus: "User profile is updated successfully",
                                editUserFormValidations: {nameErrors: "", emailErrors: "", serverSideErrors: ""},
                            }
                        )
                        this.toggleEditUserPopup()
                        this.toggleEditUserStatusDisplay()
                    } else {
                        this.setState(
                            {
                                editUserFormValidations: {nameErrors: "", emailErrors: "", serverSideErrors: user},
                            }
                        )
                    }
                    this.setState(
                        {
                            editName: this.props.user.name,
                            editEmail: this.props.user.email    
                        }
                    )
                })
                .catch(err => alert("Error updating your information. Please try again later", err))
            }).catch(console.log)
        }
    }
    onChangePasswordFormSubmit=()=>{
        if (this.state.oldPassword.length===0 ||this.state.newPassword.length===0 ||this.state.confirmPassword.length===0) {
            this.setState({changePasswordFormValidations: {errors: "All fields are mandatory"}})
        } else if (this.state.confirmPassword !== this.state.newPassword) {
            this.setState({changePasswordFormValidations: {confirmPasswordError: "Password did not match. Please reenter the same new password for confirmation"}})
        } else {
            this.props.refreshToken().then(resolved=>{
                fetch(`${USER_API_LOCAL}update-password`, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.props.cookies.get('id_token')}`
                    }, 
                    body: JSON.stringify({
                        id: this.props.user.id, 
                        oldPassword: this.state.oldPassword, 
                        newPassword: this.state.newPassword
                    })
                })
                .then(res => res.json())
                .then(result => {
                    if (result==='Success') {
                        this.setState(
                            {
                                changePasswordStatus: "Password change is successfull", 
                                changePasswordFormValidations: {confirmPasswordError: "", errors: ""},
                            }
                        )
                        this.toggleChangePasswordPopup()
                        this.toggleChangePasswordStatusDisplay()
                    } else {
                        this.setState(
                            {
                                changePasswordFormValidations: {confirmPasswordError: "", errors: result},
                            }
                        )
                    }
                    this.setState(
                        {
                            oldPassword:"",
                            newPassword:"",
                            confirmPassword:""
                        }
                    )
                })
                .catch(err => alert("Error occured while updating the password. Please try again after some time"))
            }).catch(console.log)
        }
    }
    onUserNameChange=(event)=>{
        this.setState(
            {editName: event.target.value}
        )
    }
    onUserEmailChange=(event)=>{
        this.setState(
            {editEmail: event.target.value}
        )
    }
    onOldPasswordChange=(event)=>{
        this.setState(
            {oldPassword: event.target.value}
        )
    }
    onNewPasswordChange=(event)=>{
        this.setState(
            {newPassword: event.target.value}
        )
    }
    onConfirmPasswordChange=(event)=>{
        this.setState(
            {confirmPassword: event.target.value}
        )
    }
    toggleEditUserStatusDisplay=()=>{
        this.setState(
            {editUserStatusDisplay: !this.state.editUserStatusDisplay}
        )
        setTimeout(() => {
            this.setState(
                {editUserStatusDisplay: false}
            ) 
        }, 2000);
    }
    toggleChangePasswordStatusDisplay=()=>{
        this.setState(
            {changePasswordStatusDisplay: !this.state.changePasswordStatusDisplay}
        )
        setTimeout(() => {
            this.setState(
                {changePasswordStatusDisplay: false}
            ) 
        }, 2000);
    }
    setAvatar=(id)=>{
        this.setState(
            {editAvatar: id}
        )
    }
    areUserDetailsChanged=()=>this.state.editName && this.state.editName.length>0 && this.state.editEmail.length>0 && (this.state.editName!==this.props.user.name || this.state.editEmail!==this.props.user.email || this.state.editAvatar!==this.props.user.avatar_id)
    arePasswordDetailsChanged=()=>this.state.oldPassword.length>0 && this.state.newPassword.length>0 && this.state.confirmPassword.length>0 
    render(){
        return(
            <div className="flex">
                <PageMenu Options={['General Information', 'Settings']} active={this.props.activeOption}/>
                <div style={{width: '100%', height: '100%'}}>
                    <div>
                        {(this.props.activeOption==='General Information')
                            ?<div>
                                <div className="flex justify-end tc mt3">
                                    <Actionbutton action="Edit" takeAction={this.toggleEditUserPopup}/>
                                </div>
                                <div className="flex justify-center pa3">
                                    <div className="flex justify-between mh5">
                                        <div className="mr2">
                                            <p>Name:</p>
                                            <p>Email:</p>
                                            <p>Role:</p>
                                        </div>
                                        <div>
                                            <p className="pull-left">{this.props.user.name}</p>
                                            <p className="pull-left">{this.props.user.email}</p>
                                            <p className="pull-left">{this.props.user.role}</p>
                                        </div>
                                    </div>
                                    <div className="mh5">
                                        <img src={(this.props.user.avatar_id)?`https://robohash.org/${this.props.user.avatar_id}?set=set2&size=120x120`:MYprofile} alt="" width="120px" height="120px"/>
                                    </div>
                                </div>
                            </div>
                            :<p className="profile-item-links link dim pointer ph3 black underline" onClick={this.toggleChangePasswordPopup}>Change Password</p>
                        }
                    </div>
                    <Modal modalState={this.state.editUserModal} toggle={this.toggleEditUserPopup}>
                        <EditUserForm toggleEditUserPopup={this.toggleEditUserPopup} onUserEditFormSubmit={this.onUserEditFormSubmit} onUserNameChange={this.onUserNameChange} onUserEmailChange={this.onUserEmailChange} user={this.props.user} setAvatar={this.setAvatar} validations={this.state.editUserFormValidations} disableSubmitButton={!this.areUserDetailsChanged()}/>
                    </Modal>
                    <Toaster toasterState={this.state.editUserStatusDisplay} toggle={this.toggleEditUserStatusDisplay} message={this.state.editUserStatus}/>
                    <Modal modalState={this.state.changePasswordModal} toggle={this.toggleChangePasswordPopup}>
                        <ChangePasswordForm toggleChangePasswordPopup={this.toggleChangePasswordPopup} onChangePasswordFormSubmit={this.onChangePasswordFormSubmit} onOldPasswordChange={this.onOldPasswordChange} onNewPasswordChange={this.onNewPasswordChange} onConfirmPasswordChange={this.onConfirmPasswordChange} validations={this.state.changePasswordFormValidations} disableSubmitButton={!this.arePasswordDetailsChanged()}/>
                    </Modal>
                    <Toaster toasterState={this.state.changePasswordStatusDisplay} toggle={this.toggleChangePasswordStatusDisplay} message={this.state.changePasswordStatus}/>
                </div>
            </div>
        )
    }
}

export default withCookies(Profile);