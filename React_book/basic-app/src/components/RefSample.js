import React, { Component, useRef } from "react";

class RefSample extends Component{
    input = React.createRef();

    handleFocus = ()=>{
        this.input.current.focus();
    }

    render(){
        return(
            <div>
                <input ref={this.input} />
            </div>
        )
    }

}

// const RefSample = ()=>{
//     const id = useRef(1);
//     const setId = (n)=>{
//         id.current = n;
//     }

//     const printId = ()=>{
//         console.log(id.current);
//     }

//     return(
//         <div>
//             refsample
//         </div>
//     )
// };

export default RefSample;