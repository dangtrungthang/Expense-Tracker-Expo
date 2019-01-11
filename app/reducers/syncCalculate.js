import { SYNC_CALCULATE} from '../actions/index';

export default function syncCalculate(state =false, action) {
    switch (action.type) {
        case SYNC_CALCULATE:
            return action.payload
        default:
            return state
    }
}