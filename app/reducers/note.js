import { NOTE} from '../actions/index';

export default function note(state ='', action) {
    switch (action.type) {
        case NOTE:
            return action.payload
        default:
            return state
    }
}