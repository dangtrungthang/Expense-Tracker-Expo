import { CATEGORY } from '../actions/index';

export default function category(state = {name:'Select icon',icon:require('../assets/icons/restaurant.png'),isExpense:false}, action) {
    switch (action.type) {
        case CATEGORY:
            return action.payload
        default:
            return state
    }
}