import React, { useState, useEffect, useReducer } from "react";

function reducer(state, action){
    return {
        ...state,
        [action.name] : action.value
    }
}

const Info = ()=>{
    const [state, dispatch] = useReducer(reducer, {
        name : '',
        nickname : ''
    });

    const { name, nickname } = state;

    const onChange = e=>{
        dispatch(e.target);
    }
    // const [name, setName] = useState('');
    // const [nickname, setNickname] = useState('');

    // useEffect(()=>{
    //     console.log('렌더링이 완료되었습니다!');
    //     console.log({
    //         name,
    //         nickname,
    //     });
    // });

    useEffect(()=>{
        console.log('effect');
        console.log(name);
        return ()=>{
            console.log('cleanup');
            console.log(name);
        }
    });

    // const onChangeName = e=>{
    //     setName(e.target.value);
    // };

    // const onChangeNickname = e=>{
    //     setNickname(e.target.value);
    // }

    // return (
    //     <div>
    //         <input type="text" name="name" onChange={onChangeName} />
    //         <input type="text" name="nickname" onChange={onChangeNickname} />
    //         <span>이름 : {name}</span>
    //         <span>닉네임 : {nickname}</span>
    //     </div>
    // )
    return (
        <div>
            <input type="text" name="name" value={name} onChange={onChange} />
            <input type="text" name="nickname" value={nickname} onChange={onChange} />
            <span>이름 : {name}</span>
            <span>닉네임 : {nickname}</span>
        </div>
    )
}

export default Info;