import { ACCOUNT} from '../actions/index';

export default function accoount(state = {icon:require('../assets/icons/account/money-2.png'),
    name:'Default Account',
    OpendingBlance:0,
    EndingBlance:0,}, action) {
    switch (action.type) {
        case ACCOUNT:
            return action.payload
        default:
            return state
    }
}