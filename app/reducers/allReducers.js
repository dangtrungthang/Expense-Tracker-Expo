import { combineReducers } from 'redux';
import category from './category';
import account from './account';
import note from './note';
import selectAccount from './selectAccount';
import getInfoTransaction from './getInfoTransaction';
import getInfoAccount from './getInfoAccount'
import getInfoCategory from './getInfoCategory'
import syncCalculate from './syncCalculate'
import dateStartEnd from './dateStartEnd'
const allReducers = combineReducers({
   category,
   account,
   note,
   selectAccount,
   getInfoTransaction,
   getInfoAccount,
   getInfoCategory,
   syncCalculate,
   dateStartEnd
  
});
export default allReducers;