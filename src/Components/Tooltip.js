import React, { Component } from 'react';

class Tooltip extends Component {
    constructor(){
        super()
        this.state={
            hover: 'false'
        }
    }
    hoverChange=(value)=>{
        this.setState({hover:value})
    }
    render(){
        return(
            <div>
                <div
                    onMouseOver={()=>{this.hoverChange('true')}}
                    onMouseOut={()=>{this.hoverChange('false')}}
                >
                    {this.props.children}
                </div>
                <div className='bg-black-80 white f6 ba br2 b--black pa2'
                    style={{display: (this.state.hover==='true')?'block':'none', 
                            position: 'fixed', 
                            width: '160px',
                            zIndex: 20}}
                >
                    {this.props.tip}
                </div>
            </div>
        )
    }
} 
export default Tooltip;