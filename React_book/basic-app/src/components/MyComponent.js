import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MyComponent = props => {
    return (
        <div>
            안녕하세요, 제 이름은 {props.name}입니다.
        </div>
    );
};


MyComponent.defaultProps = {
    name : '기본 이름'
};

MyComponent.propTypes = {
    name : PropTypes.string,
    favoriteNumber : PropTypes.number.isRequired,
};

export default MyComponent;