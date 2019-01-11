export const CATEGORY='CATEGORY'
export const ACCOUNT='ACCOUNT'
export const NOTE='NOTE'
export const SELECT_ACCOUNT='SELECT_ACCOUNT' // chọn ví ở màn hình transaction
export const GET_INFO_TRANSACTION='GET_INFO_TRANSACTION'
export const GET_INFO_ACCOUNT='GET_INFO_ACCOUNT'
export const GET_INFO_CATEGORY='GET_INFO_CATEGORY'
export const SYNC_CALCULATE='SYNC_CALCULATE'
export const DATE_START_END='DATE_START_END'
export function category(category){
    return{
        type:CATEGORY,
        payload:category
    }
}

export function account(account){
    return{
        type:ACCOUNT,
        payload:account
    }
}

export function note(note){
    return{
        type:NOTE,
        payload:note
    }
}
export function selectAccount(account){
    return{
        type:SELECT_ACCOUNT,
        payload:account
    }
}
export function getInfoTransaction(data){
    return{
        type:GET_INFO_TRANSACTION,
        payload:data
    }
}
export function getInfoAccount(data){
    return{
        type:GET_INFO_ACCOUNT,
        payload:data
    }
}
export function getInfoCategory(data){
    return{
        type:GET_INFO_CATEGORY,
        payload:data
    }
}
export function syncCalculate(bool){
    return{
        type:SYNC_CALCULATE,
        payload:bool
    }
}

export function dateStartEnd(date){
    return{
        type:DATE_START_END,
        payload:date
    }
}

