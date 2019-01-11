import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={this.props.style}>
                <Text style={this.props.styleTitle}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}
Button.defaultProps={
    style:{marginHorizontal: 10,}
}
Button.propTypes={
    onPress:PropTypes.func,
    style:PropTypes.any,
    styleTitle:PropTypes.any,
    title:PropTypes.string
}
