// @flow
import React, { Component } from 'react';
import { shell } from 'electron';

type Item = {
  id: string,
  title: string,
  link: string,
  text: [string]
};

type ItemProps = {
  item: Item
};

function onClick(url, e) {
  e.preventDefault();
  return shell.openExternal(url);
}

export default class ItemRow extends Component<ItemProps> {
  props: ItemProps;

  render() {
    const { item } = this.props;
    const joinedText = item.text.join('\n');

    return (
      <tr>
        <td>{item.title}</td>
        <td>{joinedText}</td>
        <td>
          <a href={item.link} onClick={onClick.bind(null, item.link)}>
            Link
          </a>
        </td>
      </tr>
    );
  }
}
