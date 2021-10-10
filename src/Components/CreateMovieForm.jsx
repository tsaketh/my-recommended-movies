import React from 'react';
import 'tachyons';
import Form from './Form';

const CreateMovieForm = ({toggle, setMovieTitle, setMovieGenre, setMovieYear, onFormSubmit}) => {
    return(
        <Form toggle={toggle} onFormSubmit={onFormSubmit}>
            <fieldset id="create_movie" className="ba b--transparent ph0 mh0">
                <legend className="f3 fw6 ph0 mh0 center">Create Movie</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="text">Title</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" name="title"  id="title"
                        onChange={setMovieTitle}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="text">Genre</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" name="genre"  id="genre"
                        onChange={setMovieGenre}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="text">Year</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" name="year"  id="year"
                        onChange={setMovieYear}/>
                </div>
            </fieldset>
        </Form>
    )
}

export default CreateMovieForm;