import React from 'react';
import 'tachyons';

const Form = (props) => {
    return(
        <article className="br2 ba bg-light-green dark-gray b--black-10 w-100 center shadow-5">
            <main className="pa4 black-80">
                <div className="measure center">
                    {props.children}
                    <div className="my-center flex justify-between mt3">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            disabled={props.disableSubmit}
                            value={props?.submitLabel || "Create"} 
                            onClick={props.onFormSubmit}/>
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Cancel" 
                            onClick={props.toggle}/>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Form;