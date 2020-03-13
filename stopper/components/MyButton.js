import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class MyButton extends Component {
    render() {

        return (
            <TouchableOpacity onPress={this.props.funkcja}>
                <Text style={this.props.styleProp}>{this.props.tekst}</Text>
            </TouchableOpacity >
        );
    }
}

MyButton.propTypes = {
    tekst: PropTypes.string.isRequired,
    funkcja: PropTypes.func.isRequired
};

export default MyButton;








