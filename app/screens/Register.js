import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name:' '
        };
    }

    onRegister = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.createDBwithAuth()
                this.props.navigation.navigate('Main')
        })
            .catch(error => alert(`${error}`))
    }
    createDBwithAuth() {
        var user = firebase.auth().currentUser;
        var uID
        if (user != null) {
            uID = user.uid
        } else {
            alert('Loi dang nhap - tao DB')
        }
       
        firebase.database().ref(uID+'/Account').push({
            name:'Default Account',
            icon:'money-2',
            opendingBlance:0,
            endingBlance:0
         })
        
        
       
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.regform}>
                    <Text style={styles.header}>Registration</Text>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Your name"
                        underlineColorAndroid={'transparent'}
                        onChangeText={name => this.setState({ name })}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="Your email"
                        underlineColorAndroid={'transparent'}
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="Your password"
                        secureTextEntry={true}
                        underlineColorAndroid={'transparent'}
                        onChangeText={password => this.setState({ password })}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.onRegister()}
                    >
                        <Text style={styles.btnText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#2ecc71',
        paddingLeft: 60,
        paddingRight: 60
    },

    regform: {
        alignSelf: 'stretch',
        color: 'green'
    },

    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },

    textInput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },

    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#27ae60',
        marginTop: 30
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})