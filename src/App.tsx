import React from 'react';
import { useSelector } from 'react-redux';
import { eSteps } from 'features/game/gameSlice';
import Start from 'features/game/steps/start';
import Result from 'features/game/steps/result';
import Game from 'features/game/steps/game';
import { tRootState } from './store/store';

function App() {
  const step = useSelector((state: tRootState) => state.game.step);

  switch (step) {
    case eSteps.GAME:
      return <Game />;
    case eSteps.RESULT:
      return <Result />;
    default:
      return <Start />;
  }
}

export default App;
