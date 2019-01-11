import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as colors from '../config/colors';
import Button from '../components/Button';
let screenWidth = Dimensions.get('window').width;
class HeaderAdd extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title={this.props.titleLeft}
                    onPress={this.props.onPressLeft}           
                    styleTitle={styles.buttonTitle} />

                <Text style={styles.title}>{this.props.title}</Text>
                <Button
                    title={this.props.titleRight}
                    onPress={this.props.onPressRight}
                    styleTitle={styles.buttonTitle} />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.colorHeader,
        height: 80,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { //Title header
        fontSize: 20,
        color: 'white',
        fontWeight: '700',
    },
    buttonTitle:{
        color:'white',
        
        
    }
});
export default HeaderAdd;
