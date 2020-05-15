import {SET_USER} from '../actions/actions';
import {combineReducers} from 'redux';

function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, action.user);
    default:
      return state;
  }
}

export default combineReducers({
  user,
});
