import React, { Component } from "react";

class EventPractice extends Component {
    constructor(props){
        super(props);
        this.state = {
            message : '',
        }

        //this는 포출부에 따라 결정된다. 이를 위해 bind를 함.
        //이런 작업을 하지 않으려면 애초에 class 내에서 함수를 선언할 때 ()=>{}를 이용하는 것이다.
        //위와 관련된 내용은 바벨의 transform-class-properties 문법이다.
        // this.handleChange = this.handleChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    // handleChange(e){
    //     this.setState({
    //         message : e.target.value
    //     });
    // }

    // handleClick(e){
    //     this.setState({
    //         message : ''
    //     });
    // }

    handleChange = (e)=>{
        this.setState({
            message : e.target.value
        });
    }

    handleClick = (e)=>{
        this.setState({
            message : e.target.value
        });
    }

    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={ this.handleChange}
                    />
                <button
                    onClick={ this.handleClick}>
                    확인
                </button>
            </div>
        )
    }
}

export default EventPractice;