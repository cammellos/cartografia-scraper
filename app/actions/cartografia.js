// @flow
import type { Dispatch } from '../reducers/types';
import fetchHTML from '../services/fetcher';
import parseHTML from '../services/cartografia';
import { insertBulk } from '../services/db';

const urls = [
  'https://www.cartografia.regione.lombardia.it/sivas/jsp/procedimenti/procedimentiInCorsoVa.jsf',
  'https://www.cartografia.regione.lombardia.it/sivas/jsp/procedimenti/procedimentiInCorsoVe.jsf',
  'https://www.cartografia.regione.lombardia.it/sivas/jsp/procedimenti/procedimentiChiusiVa.jsf',
  'https://www.cartografia.regione.lombardia.it/sivas/jsp/procedimenti/procedimentiChiusiVe.jsf',
  'https://www.cartografia.regione.lombardia.it/sivas/jsp/procedimenti/procedimentiMinisterialiVa.jsf',
  'https://www.cartografia.regione.lombardia.it/sivas/jsp/procedimenti/procedimentiMinisterialiVe.jsf'
];

export const START_UPDATE_CARTOGRAFIA = 'START_UPDATE_CARTOGRAFIA';
export const PROCESSING_UPDATE_CARTOGRAFIA = 'PROCESSING_UPDATE_CARTOGRAFIA';
export const DONE_UPDATE_CARTOGRAFIA = 'DONE_UPDATE_CARTOGRAFIA';
export const ERROR_UPDATE_CARTOGRAFIA = 'ERROR_UPDATE_CARTOGRAFIA';

export function startUpdate() {
  return {
    type: START_UPDATE_CARTOGRAFIA
  };
}

export function processingUpdate() {
  return {
    type: PROCESSING_UPDATE_CARTOGRAFIA
  };
}

export function doneUpdate(items) {
  return {
    type: DONE_UPDATE_CARTOGRAFIA,
    items
  };
}

export function errorUpdate(message) {
  return {
    type: ERROR_UPDATE_CARTOGRAFIA,
    message
  };
}

export function update() {
  return (dispatch: Dispatch) => {
    dispatch(startUpdate());
    return Promise.all(urls.map(fetchHTML))
      .then(response => {
        dispatch(processingUpdate());
        const items = [].concat(
          ...response.map((html, index) => parseHTML(urls[index], html))
        );
        return insertBulk(items).then(results =>
          dispatch(doneUpdate(results.filter(i => i)))
        );
      })
      .catch(error => {
        dispatch(errorUpdate(error.message));
      });
  };
}
