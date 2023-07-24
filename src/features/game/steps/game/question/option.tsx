import React from 'react';
import classNames from 'classnames';
import styles from './question.module.scss';
import OptionBorder from './optionBorder';

interface iOption {
  value: string;
  title: string;
  answer: string | null;
  onSelect: () => void;
  selectedAnswer: string | undefined;
}

function Option({ value, title, onSelect, selectedAnswer, answer }: iOption) {
  return (
    <li
      className={classNames(styles.option, {
        [styles.isSelected]: selectedAnswer === value,
        [styles.isWrong]:
          answer && answer !== value && selectedAnswer === value,
        [styles.isSucceed]: answer && answer === value,
      })}
    >
      <OptionBorder />
      <button type="button" onClick={onSelect}>
        <span>{value}</span> {title}
      </button>
    </li>
  );
}

export default Option;
