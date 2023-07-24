import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { tRootState } from 'store/store';
import styles from './amount.module.scss';
import ItemBorder from './itemBorder';

interface iItem {
  cost: number;
  index: number;
}

function Item({ cost, index }: iItem) {
  const { currentCost, succeededCosts } = useSelector(
    (state: tRootState) => state.game
  );
  return (
    <li
      key={cost}
      className={classNames(styles.item, {
        [styles.isActive]: currentCost === index,
        [styles.isSucceed]: succeededCosts.includes(index),
      })}
    >
      <ItemBorder />
      <span>${cost.toLocaleString()}</span>
    </li>
  );
}

export default Item;
