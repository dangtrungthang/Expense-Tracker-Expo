import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import HeaderAdd from '../components/HeaderAdd';
import Button from '../components/Button';
import { ActionSheet } from 'native-base';
import Modal from 'react-native-modal';
import { CategoryIcon } from '../config/icon';
import { connect } from 'react-redux';
import { addCategory} from '../database/firebaseDB'

const Height = Dimensions.get('window').height / 2;

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName:'',
            isExpense: true,
            isActiveColor: 'gray',
            type: 'Choose Type',
            modalVisible: false,
            dataIcon: CategoryIcon,
            paramIcon:{
                name: 'beer',
                icon: require('../assets/icons/category/expense/beer.png'),
            }
        };
    }
    onSaveCategory(){
        const data={
            icon:this.state.paramIcon.name,
            name:this.state.categoryName,
            isExpense:this.state.isExpense
        }
        addCategory(data).then((account) => {
            
          }).catch((error)=>{
              alert(`${error}`)
          })
          this.props.navigation.navigate('Category')
        
    }
    showActionSheet() {
        const BUTTONS = ['Expense', 'Income']
        if (this.actionSheet != null) {
            this.actionSheet._root.showActionSheet(
                {
                    options: BUTTONS,
                    title: "Select type"
                },
                buttonIndex => {
                    switch (BUTTONS[buttonIndex]) {
                        case 'Expense': this.setState({ isExpense: true, isActiveColor: 'green', type: 'Expense' }); return
                        case 'Income': this.setState({ isExpense: false, isActiveColor: 'green', type: 'Income' }); return

                    }
                }
            );
        }
    }

    render() {
        return (
            <View>
                <HeaderAdd
                    titleRight='Save'
                    onPressRight={() => this.onSaveCategory()} />
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
                        placeholder='Name Category'
                        placeholderTextColor='gray'
                        onChangeText={(text)=>this.setState({categoryName:text})}
                    />

                </View>
                <TouchableOpacity style={[styles.wrapperPicker, { borderColor: this.state.isActiveColor }]}
                    onPress={(event) => {
                        this.showActionSheet()
                    }}>
                    <Text>{this.state.type}</Text>
                    <ActionSheet ref={(c) => { this.actionSheet = c; }} />
                </TouchableOpacity>

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
    wrapperPicker: {
        opacity: 0.5,
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 4,
        flex: 1,
        marginHorizontal: 20,
        marginTop: 5,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
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
const mapDispatchToProps = (dispatch) => {
    return {
     
    }
  }

  export default connect(mapDispatchToProps )(AddCategory);
