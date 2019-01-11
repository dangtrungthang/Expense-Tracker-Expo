import { GET_INFO_CATEGORY} from '../actions/index';

export default function getInfoCategory(state =[], action) {
    switch (action.type) {
        case GET_INFO_CATEGORY:
            return action.payload
        default:
            return state
    }
}