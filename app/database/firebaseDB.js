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
                icon: mapToArray(doc.val().icon, CategoryIcon),
                isExpense: doc.toJSON().isExpense,
                iconName: doc.val().icon
            })
        })

        resolve(data)
    })
})
// get data transactions
export const getTransactions = data => new Promise((resolve, reject) => {
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/Transactions').on('value', (snap) => {
        data = []
        getCategory().then((categoryData) => {
            snap.forEach((doc) => {
                tempCategory=mapToArrayCategory(doc.toJSON().category, categoryData)
                data.push({
                    key: doc.key,
                    account: doc.toJSON().account,
                    amount: doc.toJSON().amount,
                    category:tempCategory,
                    date: doc.toJSON().date,
                    note: doc.toJSON().note,
                    icon:mapToArray(tempCategory.iconName,CategoryIcon)
                })
            })
            resolve(data)
        })


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
//
const mapToArrayCategory = (id, data) => {
    for (i = 0; i < data.length; i++) {
        if (data[i].key == id) {
            return data[i]
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
//Delete Item with key
export const deleteItem = (key, schemas) => new Promise((resolve, reject) => {
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/' + schemas + '/' + key).remove()
    resolve()
})
// Update Account with key
export const updateAccount = (key, data) => new Promise((resolve, reject) => {
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/Account/' + key).update({
        icon: data.icon,
        name: data.name,
        opendingBlance: data.opendingBlance,
        endingBlance: 0,
    })
    resolve()
})
// Update Category with key
export const updateCategory = (key, data) => new Promise((resolve, reject) => {
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/Category/' + key).update({
        icon: data.icon,
        name: data.name,
        isExpense: data.isExpense
    })
    resolve()
})

//Add Transaction
export const addTransaction = data => new Promise((resolve, reject) => {
    const uID = firebase.auth().currentUser.uid
    firebase.database().ref(uID + '/Transactions').push({
        amount: data.amount,
        category: data.category,
        note: data.note,
        date: data.date,
        account: data.account
    })
    resolve()
})