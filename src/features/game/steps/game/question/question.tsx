import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  fetchApiCheckResult,
  selectCurrentQuestion,
  nextQuestion,
  nextStep,
} from 'features/game/gameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { tRootState } from 'store/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import styles from './question.module.scss';
import Option from './option';

const Question = memo(() => {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const state = useSelector((state: tRootState) => state);
  const question: any = selectCurrentQuestion(state);
  const answer = useSelector((state: tRootState) => state.game.currentAnswer);
  const isChecking = useSelector((state: tRootState) => state.game.isChecking);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (answer) {
      if ((answer as string) === (selectedAnswer as string)) {
        setTimeout(() => {
          dispatch(nextQuestion());
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch(nextStep());
        }, 1000);
      }
    }
  }, [dispatch, answer, selectedAnswer]);

  useEffect(() => {
    setSelectedAnswer(undefined);
  }, [question]);

  const handlerOnVote = useCallback(
    (option: string) => {
      if (!isChecking) {
        setSelectedAnswer(option);
        dispatch(fetchApiCheckResult({ questionId: question?.id, option }));
      }
    },
    [dispatch, question, isChecking]
  );

  if (!question) return null;

  return (
    <div className={styles.questionSection}>
      <h2>{question.title}</h2>
      <ul>
        {Object.keys(question.options).map((option: string) => (
          <Option
            key={option}
            value={option}
            selectedAnswer={selectedAnswer}
            title={question.options[option]}
            onSelect={() => handlerOnVote(option)}
            answer={answer}
          />
        ))}
      </ul>
    </div>
  );
});

export default Question;
