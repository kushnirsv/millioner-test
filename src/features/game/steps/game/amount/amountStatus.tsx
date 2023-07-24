import React from 'react';
import { useSelector } from 'react-redux';
import { tRootState } from 'store/store';
import classNames from 'classnames';
import styles from './amount.module.scss';
import Item from './item';

interface iAmountStatus {
  isOpenAmount: boolean;
}

function AmountStatus({ isOpenAmount }: iAmountStatus) {
  const { amount } = useSelector((state: tRootState) => state.game);
  return (
    <div
      className={classNames(styles.amountSection, {
        [styles.isOpen]: isOpenAmount,
      })}
    >
      <ul>
        {amount.map((cost: number, index: number) => (
          <Item key={cost} cost={cost} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default AmountStatus;
