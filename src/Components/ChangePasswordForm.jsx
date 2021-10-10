import React from 'react';
import 'tachyons';
import Form from './Form';
import Validations from './Validations';

const ChangePasswordForm = ({toggleChangePasswordPopup, onChangePasswordFormSubmit, onOldPasswordChange, onNewPasswordChange, onConfirmPasswordChange, validations, disableSubmitButton}) => {
    return(
        <Form toggle={toggleChangePasswordPopup} onFormSubmit={onChangePasswordFormSubmit} submitLabel="Submit" disableSubmit={disableSubmitButton}>
            <legend className="f4 fw6 ph0 mh0 center black-80">Change Password</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6 black-80" htmlFor="old-password">Old Password*</label>
                <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" name="old-password"  id="old-password" 
                    onChange = {onOldPasswordChange}/>
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6 black-80" htmlFor="new-password">New Password*</label>
                <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" name="new-password"  id="new-password" 
                    onChange = {onNewPasswordChange}
                    />
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6 black-80" htmlFor="confirm-password">Confirm Password*</label>
                <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" name="confirm-password"  id="confirm-password" 
                    onChange = {onConfirmPasswordChange}
                    />
                <Validations errors = {validations.confirmPasswordError}/>
            </div>
            <Validations errors = {validations.errors}/>
        </Form>
    )
}

export default ChangePasswordForm;