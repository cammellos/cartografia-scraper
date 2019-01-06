// @flow
import {
  ERROR_UPDATE_CARTOGRAFIA,
  START_UPDATE_CARTOGRAFIA,
  DONE_UPDATE_CARTOGRAFIA,
  PROCESSING_UPDATE_CARTOGRAFIA
} from '../actions/cartografia';
import type { Action } from './types';

export default function cartografia(
  state: {
    loading: boolean,
    status: string,
    error: string,
    items: [
      {
        title: string,
        description: string,
        id: string,
        link: string,
        issuer: string
      }
    ]
  } = { loading: false, items: [], error: '' },
  action: Action
) {
  switch (action.type) {
    case START_UPDATE_CARTOGRAFIA:
      return Object.assign({}, state, {
        loading: true,
        status: 'Fetching urls...',
        error: ''
      });
    case PROCESSING_UPDATE_CARTOGRAFIA:
      return Object.assign({}, state, {
        status: 'Processing documents...'
      });
    case DONE_UPDATE_CARTOGRAFIA:
      return Object.assign({}, state, {
        items: action.items,
        loading: false,
        status: '',
        error: ''
      });
    case ERROR_UPDATE_CARTOGRAFIA:
      return Object.assign({}, state, {
        loading: false,
        status: '',
        error: action.message
      });
    default:
      return state;
  }
}
