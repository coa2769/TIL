import React, { useState, useEffect } from "react";

const Info = ()=>{
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

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

    const onChangeName = e=>{
        setName(e.target.value);
    };

    const onChangeNickname = e=>{
        setNickname(e.target.value);
    }

    return (
        <div>
            <input type="text" name="name" onChange={onChangeName} />
            <input type="text" name="nickname" onChange={onChangeNickname} />
            <span>이름 : {name}</span>
            <span>닉네임 : {nickname}</span>
        </div>
    )
}

export default Info;