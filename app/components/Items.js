// @flow
import React, { Component } from 'react';
import ItemRow from './ItemRow';

type Item = {
  id: string,
  title: string,
  link: string,
  text: [string]
};

type ItemsProps = {
  items: [Item]
};

export default class Items extends Component<ItemsProps> {
  props: ItemsProps;

  render() {
    const { items } = this.props;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <ItemRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    );
  }
}
