import React, {useState, useMemo, useCallback, useRef } from "react";

const getAverage = numbers =>{
    console.log('평균값 계산 중...');
    if(numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b)=> a + b);
    return sum / numbers.length;
};

const Average = ()=>{
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null); //ref

    // const onChange = e=>{
    //     setNumber(e.target.value);
    // };
    const onChange = useCallback(e=>{
        setNumber(e.target.value);
    }, []);

    // const onInsert = e=>{
    //     const nextList = list.concat(parseInt(number));
    //     setList(nextList);
    //     setNumber('');
    // }
    const onInsert = useCallback(()=>{
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        //ref로 지정된 tag에 포커스 맞추기
        inputEl.current.focus();
    }, [number, list]); //number 혹은 list가 바뀌었을 때만 함수 생성

    //최적화 할 함수와 값이 바뀌는 것을 판별할 변수를 파라미터로 넣는다.
    const avg = useMemo(()=> getAverage(list), [list]);

    return(
        <div>
            <input value={number} onChange={onChange} ref={inputEl} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값 : </b> {avg}
            </div>
        </div>
    )
}

export default Average;