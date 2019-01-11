import { DATE_START_END} from '../actions/index';

export default function dateStartEnd(state =[{start:'27-12-2018',end:'27-12-2018'}], action) {
    switch (action.type) {
        case DATE_START_END:
            return action.payload
        default:
            return state
    }
}