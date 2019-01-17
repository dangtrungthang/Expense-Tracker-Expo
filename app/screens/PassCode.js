import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { KeycodeInput } from 'react-native-keycode'
import { List, ListItem } from 'react-native-elements';
export default class PassCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            set: true,
            set2: false,
            value: ''
        };
    }

    render() {
        if (this.state.set) {
            return (
                <View style={styles.header}>
                    <TouchableOpacity>
                        <ListItem
                            roundAvatar
                            title={"Set PassCode"}
                            subtitle={"Set passcode default"}
                            avatar={require('../assets/icons/images/atm.png')}
                            onPress={() => {
                                this.setState({ set2: true, set: false })
                            }}
                        />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>

                    <Text style={styles.text}>Enter your access code.</Text>

                    <KeycodeInput
                        //keyboardType='pad-decimal'
                        value={this.state.value}
                        onChange={(value) => this.setState({ value })}
                        onComplete={(value) => {
                            alert('Completed! Value: ' + value)
                        }} />

                    <View style={styles.button}>
                        <Button
                            color='#9b9b9b'
                            title='Reset value'
                            onPress={() => this.setState({ value: '' })} />
                        <Button
                            color='#9b9b9b'
                            title='OK'
                            onPress={() => this.setState({ set2: false, set: true })} />
                    </View>

                </View>
            )
        }

    }
}
const styles = StyleSheet.create({
    header: {
        marginTop: 80,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingBottom: 200
    },
    text: {
        fontSize: 18,
        marginBottom: 32
    },
    button: {
        marginTop: 96
    }
})