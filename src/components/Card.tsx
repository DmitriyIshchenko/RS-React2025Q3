import { Component } from 'react';
import type { Recipe } from '../lib/types';

export default class Card extends Component<Pick<Recipe, 'name' | 'cuisine'>> {
  render() {
    const { name, cuisine } = this.props;
    return (
      <li>
        <p>{name}</p>
        <p>{cuisine}</p>
      </li>
    );
  }
}
