import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dialog from "react-native-dialog";
import * as firebase from 'firebase'


export default class More extends Component {
    state = {
        dialogVisible: false,
        atmName: '', accountName: ''
    };

    showDialog() {
        this.setState({ dialogVisible: true });
    };

    handleCancel() {
        this.setState({ dialogVisible: false });
    };

    handleFind() {
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=atm+' + this.state.atmName.toString());
        this.setState({ dialogVisible: false });
    };
    logOut() {
        firebase.auth().signOut()

    }
    getEmailUser() {
        var user = firebase.auth().currentUser
        var uID
        if (user != null) {

            this.setState({ accountName: user.email })
        }
    }
    componentDidMount() {
        this.getEmailUser()
    }
    render() {

        return (
            <View>
                <View style={styles.logoContainer}>
                    <MaterialIcons name='account-circle' size={100} color={'black'} />

                    <Text style={styles.title}>
                        {this.state.accountName}
                    </Text>
                </View>

                <List>
                    <ListItem
                        roundAvatar
                        title={"Budgets"}
                        subtitle={"Set budget for your expense"}
                        avatar={require('../assets/icons/images/budget.png')}
                    />

                    <ListItem
                        roundAvatar
                        title={"Bills"}
                        subtitle={"Monitor your repetitive bills"}
                        avatar={require('../assets/icons/images/bill.png')}
                    />

                    <ListItem
                        roundAvatar
                        title={"ATM Finder"}
                        subtitle={"Find the nearest ATM"}
                        avatar={require('../assets/icons/images/atm.png')}
                        onPress={() => this.showDialog()}
                    />
                    <TouchableOpacity onPress={()=>
                       this.props.navigation.navigate('PassCode')
                    }>
                        <ListItem
                            roundAvatar
                            title={"Passcode"}
                            subtitle={"Set passcode to protect your information"}
                            avatar={require('../assets/icons/images/passcode.png')}
                        />
                    </TouchableOpacity>


                    <ListItem
                        roundAvatar
                        title={"Notification"}
                        subtitle={"Remind you to track your expense"}
                        avatar={require('../assets/icons/images/notification.png')}
                    />
                </List>

                <TouchableOpacity onPress={() => {
                    this.logOut()
                    this.props.navigation.navigate('Login')
                }}>
                    <Text style={styles.logoutButtonText}>LOG OUT</Text>
                </TouchableOpacity>

                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>ATM Finder</Dialog.Title>
                    <Dialog.Description>
                        Please enter your ATM name
                    </Dialog.Description>
                    <Dialog.Input
                        placeholder="ATM name"
                        onChangeText={atmName => this.setState({ atmName })}
                    />
                    <Dialog.Button label="Cancel" onPress={() => this.handleCancel()} />
                    <Dialog.Button label="Find" onPress={() => this.handleFind()} />
                </Dialog.Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        marginBottom: 20
    },

    title: {
        color: "black",
        width: 500,
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 18
    },

    logoutButtonText: {
        marginTop: 50,
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
})