import * as firebase from 'firebase'
import { AccountIcon, CategoryIcon } from '../config/icon';
// getAccount from firebase database
export const getAccount = data => new Promise((resolve, reject) => {
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/Account').on('value', (snap) => {

        data = []
        snap.forEach((doc) => {

            data.push({
                key: doc.key,
                icon: mapToArray(doc.toJSON().icon, AccountIcon),
                name: doc.toJSON().name,
                opendingBlance: doc.toJSON().opendingBlance,
                endingBlance: doc.toJSON().endingBlance,
                iconName: doc.toJSON().icon
            })
        })

        resolve(data)
    })
})
// getCategory from firebase database
export const getCategory = data => new Promise((resolve, reject) => {
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/Category').on('value', (snap) => {
        data = []
        snap.forEach((doc) => {
            data.push({
                key: doc.key,
                name: doc.toJSON().name,
                icon:mapToArray(doc.val().icon, CategoryIcon),
                isExpense: doc.toJSON().isExpense,
                iconName: doc.val().icon
            })
        })

        resolve(data)
    })
})
//
const mapToArray = (name, data) => {

    for (i = 0; i < data.length; i++) {
        if (data[i].name === name) {
            return data[i].icon
        }
    }
}
// Add account 
export const addAccount = data => new Promise((resolve, reject) => {
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/Account').push({
        name: data.name,
        opendingBlance: data.opendingBlance,
        icon: data.icon
    })
})
//Add category
export const addCategory = data => new Promise((resolve, reject) => {
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/Category').push({
        icon: data.icon,
        name: data.name,
        isExpense: data.isExpense
    })
})
//Delete Category with key
export const deleteCategory=key=>new Promise((resolve,reject)=>{
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/Category/'+key).remove()
    resolve()
})