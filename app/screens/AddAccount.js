import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import HeaderAdd from '../components/HeaderAdd';
import Button from '../components/Button';
import { ActionSheet } from 'native-base';
import Modal from 'react-native-modal';
import { AccountIcon} from '../config/icon';
import { addAccount} from '../database/firebaseDB'
const Height = Dimensions.get('window').height / 2;
const numColum = Dimensions.get('window').width / 55;

class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName:'',
            OpendingBlance:0,
            isActiveColor: 'gray',
            modalVisible: false,
            dataIcon: AccountIcon,
            paramIcon:{
                name: 'money-2.png',
                icon: require('../assets/icons/account/money-2.png'),
            }
        };
    }
    onSaveAccount(){
        const data={
            name:this.state.accountName,
            opendingBlance:this.state.OpendingBlance,
            icon:this.state.paramIcon.name
        }
        addAccount(data).then((account) => {
            
          }).catch((error)=>{
              alert(`${error}`)
          })
          this.props.navigation.navigate('Account')
    }
   

    render() {
        return (
            <View>
                <HeaderAdd
                    titleRight='Save'
                    onPressRight={() => this.onSaveAccount()} />
                <View style={styles.wrapperRow}>
                    <TouchableOpacity
                        onPress={() => this.setState({ modalVisible: true })}>
                        <Image
                            style={styles.icon}
                            source={this.state.paramIcon.icon} />
                        <Text style={{ color: 'gray', opacity: 0.5, marginLeft: 8 }}>Choose Icon</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Name Account'
                        placeholderTextColor='gray'
                        onChangeText={(text)=>this.setState({accountName:text})}
                    />

                </View>
               
                    <TextInput
                    placeholder='Opending Blance'
                    placeholderTextColor='gray'
                    style={[styles.textInput,{flex:0}]}
                    onChangeText={(text)=>this.setState({OpendingBlance:text})}/>
                   
               

                <Modal
                    isVisible={this.state.modalVisible}
                    // deviceHeight={Height}
                    style={styles.Modal}>
                    <View style={styles.ModalChildWarapper}>
                        <FlatList
                            data={this.state.dataIcon}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity 
                                    onPress={()=>this.setState({paramIcon:item,modalVisible:false})}>
                                        <Image style={styles.iconItems} source={item.icon} />
                                    </TouchableOpacity>
                                )
                            }}
                            numColumns={7}
                            keyExtractor={item => item.name} />
                        <Button title='Close'
                            onPress={() => this.setState({ modalVisible: false })}
                            style={styles.ButtonCloseModal} />
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapperRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    icon: {
        width: 45,
        height: 45,
        marginHorizontal: 20,
    },
    iconItems: {
        width: 45,
        height: 45,
        margin: 5,
    },
    textInput: {
        opacity: 0.5,
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 4,
        flex: 1,
        height: 45,
        marginHorizontal: 20,

    },
   
    Modal: {
        marginHorizontal: 0, marginBottom: 0, marginTop: Height,
        backgroundColor: 'transparent'
    },
    ModalChildWarapper: {
        backgroundColor: 'white',
        flex: 1
    },
    ButtonCloseModal:{
        opacity: 0.5,
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        margin:5
    }
});

export default AddAccount;
