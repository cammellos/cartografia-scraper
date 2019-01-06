// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import cartografia from './cartografia';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    cartografia
  });
}
