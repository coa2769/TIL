// import React, { Component } from 'react';

// class Counter extends Component{
//     constructor(props){
//         super(props);
//         //state의 초깃값 설정하기
//         this.state = {
//             number : 0
//         };
//     }

//     render(){
//         const { number } = this.state;
//         return(
//             <div>
//                 <h1>{number}</h1>
//                 <button
//                     onClick={()=>{
//                         this.setState(
//                             {number : number + 1},
//                             ()=>{
//                                 console.log('방금 setState가 호출되었습니다.');
//                                 console.log(this.state);
//                             }
//                         );

//                     }}
//                 >
//                     +1
//                 </button>
//             </div>
//         )
//     }
// }

// export default Counter;

import React, { useState, useReducer } from "react";

function reducer(state, action){
    //action.type에 따라 다른 작업 수행
    switch(action.type){
        case 'INCREMENT':
            return { value : state.value + 1};
        case 'DECREMENT':
            return { value : state.value - 1};
        default : 
            //아무것도 해당되지 않을 때 기존 상태 반환
            return state;
    }
}

const Counter = ()=>{
    const [state, dispatch] = useReducer(reducer, { value : 0});
    // const [value, setValue] = useState(0);
    return(
        <div>
            <p>
                현재 카운터 값은 <b>{state.value}</b>
            </p>
            <button onClick={()=>dispatch({ type : 'INCREMENT'})}>+1</button>
            <button onClick={()=>dispatch({ type : 'DECREMENT'})}>-1</button>
        </div>
    )
    // return(
    //     <div>
    //         <p>
    //             현재 카운터 값은 <b>{value}</b>입니다.
    //         </p>
    //         <button onClick={()=>setValue(value + 1)}>+1</button>
    //         <button onClick={()=>setValue(value - 1)}>-1</button>
    //     </div>
    // )
}

export default Counter;