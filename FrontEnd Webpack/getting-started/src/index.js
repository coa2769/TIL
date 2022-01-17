import _ from 'lodash'; //전후 비교를 위해 추가

function component() {
    //div 생성
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    //div에 Hello, Webpack이라는 문자열을 추가
    //join : array에 저장된 문자열들을 separator로 구분된 한 문자열로 변환한다.
    //ex) ['one', 'two', 'three'] separator = ''  --> 'one two three'
    element.innerHTML = _.join(['Hello','webpack'], ' ');

    //생성한 div 반환
    return element;
}

//component함수에서 반환되는 tag를 body에 추가
document.body.appendChild(component());