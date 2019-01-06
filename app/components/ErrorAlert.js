// @flow
import React, { Component } from 'react';

type Props = {
  message: string
};

export default class Error extends Component<Props> {
  props: Props;

  render() {
    const { message } = this.props;

    return (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );
  }
}
