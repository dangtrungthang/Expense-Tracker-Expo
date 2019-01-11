import { SELECT_ACCOUNT} from '../actions/index';

export default function selectAccount(state = {key:'1111',name:'All account',icon:require('../assets/icons/symbol.png'),
    name:'Default Account',
    OpendingBlance:0,
    EndingBlance:0,}, action) {
    switch (action.type) {
        case SELECT_ACCOUNT:
            return action.payload
        default:
            return state
    }
}