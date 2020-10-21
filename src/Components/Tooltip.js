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
                <div className={this.props.classes}
                    onMouseOver={()=>{this.hoverChange('true')}}
                    onMouseOut={()=>{this.hoverChange('false')}}>
                    {this.props.title}
                </div>
                <div className='bg-black-80 white f6 ba br2 b--black pa2'
                    style={{display: (this.state.hover==='true')?'inline-flex':'none', 
                            position: 'inherit', 
                            zIndex: 20}}
                >
                    {this.props.tip}
                </div>
            </div>
        )
    }
} 
export default Tooltip;