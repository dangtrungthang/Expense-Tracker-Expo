import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity,Dimensions } from 'react-native';
import * as firebase from 'firebase'
const heightDv=Dimensions.get('window').height;
const widthDv=Dimensions.get('window').width;
export default class LoginWithNumPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberPhone:'',
            code:'',
            isRenderVerify:false,
            isRenderNumPhone:true
        };
    }
onLoginOrRegister(){
    const { phoneNumber } = this.state;
    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then((confirmResult) => {
         
        // This means that the SMS has been sent to the user
        // You need to:
        //   1) Save the `confirmResult` object to use later
        this.setState({ confirmResult,isRenderVerify:true,isRenderNumPhone:false });
        //   2) Hide the phone number form
        //   3) Show the verification code form
        
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
        alert(`${error}`)
      });
}
onVerificationCode = () => {
    const { confirmResult, verificationCode } = this.state;
    confirmResult.confirm(verificationCode)
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
        alert(`${error}`)
      });
  }
  renderEnterNumber(){
     if(this.state.isRenderNumPhone){
        return(
            <View>
                 <TextInput
             style={styles.inputText}
             placeholder="Number phone"
             keyboardType='decimal-pad'
             autoCapitalize="none"
             onSubmitEditing={() => this.passwordInput.focus()}
             onChangeText={phoneNumber => this.setState({ phoneNumber })}
         />
     
         <TouchableOpacity
             style={styles.loginButtonContainer}
             onPress={() => this.onLoginOrRegister()}
         >
             <Text style={styles.loginButtonText}>SEND CODE</Text>
         </TouchableOpacity>
            </View>
           )
     }
  }
  renderVerify(){
   if(this.state.isRenderVerify){
    return(
        <View>
             <TextInput
         style={styles.inputText}
         placeholder="Number phone"
         keyboardType='decimal-pad'
         autoCapitalize="none"
         onSubmitEditing={() => this.passwordInput.focus()}
         onChangeText={email => this.setState({ code })}
     />
 
     <TouchableOpacity
         style={styles.loginButtonContainer}
         onPress={() => this.onLoginOrRegister()}
     >
         <Text style={styles.loginButtonText}>SEND CODE</Text>
     </TouchableOpacity>
        </View>
       )
   }
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
                    {this.renderEnterNumber()}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.createAccountText}>Login with E-mail </Text>
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