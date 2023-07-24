import React, { useCallback, useEffect, useState } from 'react';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { fetchApiQuestions } from 'features/game/gameSlice';
import HamburgerIcon from 'assets/images/hamburger';
import CloseIcon from 'assets/images/close';
import AmountStatus from './amount/amountStatus';
import Question from './question/question';

import styles from './game.module.scss';

function Game() {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const [isOpenAmount, setIsOpenAmount] = useState(false);

  useEffect(() => {
    dispatch(fetchApiQuestions());
  }, [dispatch]);

  const handlerOnClickMenu = useCallback(() => {
    setIsOpenAmount(!isOpenAmount);
  }, [isOpenAmount]);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.hamburger}
        onClick={handlerOnClickMenu}
      >
        {isOpenAmount ? <CloseIcon /> : <HamburgerIcon />}
      </button>
      <Question />
      <AmountStatus isOpenAmount={isOpenAmount} />
    </div>
  );
}

export default Game;
