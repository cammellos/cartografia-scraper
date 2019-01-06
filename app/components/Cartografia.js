// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Cartografia.css';
import routes from '../constants/routes';
import Spinner from './Spinner';
import ErrorAlert from './ErrorAlert';
import Items from './Items';

type Props = {
  update: () => void,
  cartografia: { loading: boolean }
};

export default class Cartografia extends Component<Props> {
  props: Props;

  render() {
    const { update, cartografia } = this.props;
    return (
      <div className={styles.cartografiaContent}>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          {cartografia.error ? (
            <ErrorAlert message={cartografia.error} />
          ) : null}
        </div>
        <div className="d-flex justify-content-center">
          {cartografia.status ? (
            <div className="alert alert-info" role="alert">
              {cartografia.status}
            </div>
          ) : null}
        </div>

        <div className="d-flex justify-content-center">
          {cartografia.loading ? (
            <Spinner />
          ) : (
            <button
              type="button"
              onClick={update}
              className="btn btn-primary"
              data-tid="update"
            >
              Update
            </button>
          )}
        </div>
        <div className={styles.itemsSection}>
          <Items items={cartografia.items} />
        </div>
      </div>
    );
  }
}
