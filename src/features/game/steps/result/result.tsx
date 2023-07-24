import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { nextStep, selectTotalScore } from 'features/game/gameSlice';
import { tRootState } from 'store/store';
import Button from 'components/button';
import handImage from 'assets/images/hand.svg';

import styles from '../steps.module.scss';

function Result() {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const state = useSelector((state: tRootState) => state);
  const totalScore: number = selectTotalScore(state);

  const handlerOnNext = useCallback(() => {
    dispatch(nextStep());
  }, [dispatch]);

  return (
    <div className={classNames(styles.root, styles.root_result)}>
      <div className={styles.inner}>
        <div>
          <img src={handImage} alt="logo" />
        </div>
        <div>
          <p className={styles.label}>Total score:</p>
          <p>${totalScore} earned</p>
          <div className={styles.gap}> </div>
          <Button label="Try again" type="button" onClick={handlerOnNext} />
        </div>
      </div>
    </div>
  );
}

export default Result;
