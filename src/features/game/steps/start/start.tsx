import React, { useCallback } from 'react';
import Button from 'components/button';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { nextStep } from 'features/game/gameSlice';
import handImage from 'assets/images/hand.svg';

import styles from '../steps.module.scss';

function Start() {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();

  const handlerOnNext = useCallback(() => {
    dispatch(nextStep());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div>
          <img src={handImage} alt="logo" />
        </div>
        <div>
          <h1>Who wants to be a millionaire?</h1>
          <div className={styles.gap}> </div>
          <Button label="Start" type="button" onClick={handlerOnNext} />
        </div>
      </div>
    </div>
  );
}

export default Start;
