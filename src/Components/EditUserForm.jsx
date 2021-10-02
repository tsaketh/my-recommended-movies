import React from 'react';
import 'tachyons';
import Form from './Form';
import AvatarArray from './AvatarArray';
import CardArray from './CardArray';
import Validations from './Validations';

const EditUserForm = ({toggleEditUserPopup, onUserEditFormSubmit, onUserNameChange, onUserEmailChange, user, setAvatar, validations, disableSubmitButton}) => {
    return(
        <Form toggle={toggleEditUserPopup} onFormSubmit={onUserEditFormSubmit} submitLabel="Submit" disableSubmit={disableSubmitButton}>
            <fieldset id="create_movie" className="ba b--transparent ph0 mh0">
                <legend className="f3 fw6 ph0 mh0 center">Edit Profile</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" name="user-name-edit"  id="edit-user-name"
                        defaultValue={user.name}
                        onChange={onUserNameChange}
                        />
                    <Validations errors={validations.nameErrors}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="text">Email</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" name="user-email-edit"  id="edit-user-email"
                        defaultValue={user.email}
                        onChange={onUserEmailChange}
                        />
                    <Validations errors={validations.emailErrors}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="text">Profile avatar</label>
                    <CardArray avatars={AvatarArray} userPrefs={user} setAvatar={setAvatar}/>
                </div>
            </fieldset>
            <Validations errors={validations.serverSideErrors}/>
        </Form>
    )
}

export default EditUserForm;