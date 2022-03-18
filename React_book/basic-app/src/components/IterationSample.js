import React, { useState } from "react";

const IterationSample = ()=>{
    const [ names, setNames ] = useState([
        {id : 1, text : '눈사람'},
        {id : 2, text : '얼음'},
        {id : 3, text : '눈'},
        {id : 4, text : '바람'},
    ])
    // const [inputText ,]
    const nameList = names.map((name, index) => <li key={index}>{name}</li>);
    return <ul>{nameList}</ul>
}

export default IterationSample;