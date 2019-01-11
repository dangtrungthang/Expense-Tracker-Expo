import { GET_INFO_TRANSACTION} from '../actions/index';

export default function getInfoTransaction(state =[], action) {
    switch (action.type) {
        case GET_INFO_TRANSACTION:
            return action.payload
        default:
            return state
    }
}