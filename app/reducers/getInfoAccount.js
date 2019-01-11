import { GET_INFO_ACCOUNT} from '../actions/index';

export default function getInfoAccount(state =[], action) {
    switch (action.type) {
        case GET_INFO_ACCOUNT:
            return action.payload
        default:
            return state
    }
}