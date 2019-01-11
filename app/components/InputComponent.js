import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import * as colors from '../config/colors';
import PropTypes from 'prop-types';
class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ flex: 1, marginLeft: 10, marginTop: 12 }}
                    onPress={this.props.onPressIcon}>
                    <Image style={styles.iconStyle} source={this.props.icon} />

                </TouchableOpacity>
                <View style={{ flex: 9 }}>
                    <Text style={{color:colors.rowSeparator,opacity:0.5}}>    {this.props.title}</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='0'
                        onChangeText={this.props.onChangeText}
                        keyboardType={this.props.keyboardType}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={colors.rowSeparator}
                    />
                </View>

            </View>
        );
    }
}
InputComponent.propTypes={
    title:PropTypes.string,
    onPressIcon:PropTypes.any,
    icon:PropTypes.any,
    onChangeText:PropTypes.func,
    keyboardType:PropTypes.any,
    placeholder:PropTypes.any,
   

}
const styles = StyleSheet.create({
    container: {


        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {

        color:'black',
        borderBottomColor: colors.rowSeparator,
        borderBottomWidth: 0.4,
        height: 50,
        marginLeft: 15,
        fontSize: 25,
        
    },
    iconStyle: {
        width: 40,
        height: 40,
    }
});
export default InputComponent;
