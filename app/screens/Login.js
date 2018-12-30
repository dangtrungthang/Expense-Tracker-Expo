import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity,Dimensions } from 'react-native';
import * as firebase from 'firebase'
const heightDv=Dimensions.get('window').height;
const widthDv=Dimensions.get('window').width;
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
onLogin(){
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(`${user.user.email}`)
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
      alert(`${error}`)
    });
}
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/logo/logo.png')}
                    />

                    <Text style={styles.title}>
                        Manage money efficiently with{"\n"}
                        Expense Tracker
                </Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="username or email"
                        keyboardType='email-address'
                        autoCapitalize="none"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput
                        style={styles.inputText}
                        placeholder="password"
                        secureTextEntry
                        autoCapitalize="none"
                        ref={(input) => this.passwordInput = input}
                        onChangeText={password => this.setState({ password })}
                    />

                    <TouchableOpacity
                        style={styles.loginButtonContainer}
                        onPress={() => this.onLogin()}
                    >
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginWithNumPhone')}>
                        <Text style={styles.createAccountText}>Login with number phone </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.createAccountText}>Don't have an account yet?</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ecc71'
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    logo: {
        width: 120,
        height: 120
    },

    title: {
        color: "#FFF",
        marginTop: 10,
        width: 500,
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 20,
        fontWeight: 'bold'
    },

    formContainer: {
        padding: 20,
        alignItems:'center',
        flex:2
    },

    inputText: {
        height: 40,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingHorizontal: 10,
        width:widthDv-40
    },

    loginButtonContainer: {
        backgroundColor: '#27ae60',
        paddingVertical: 10,
        width:widthDv-40
    },

    loginButtonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },

    createAccountText: {
        textAlign: 'center',
        color: '#FFFFFF',
        paddingVertical: 10
    }
});