import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gameSlice from 'features/game/gameSlice';

const rootReducer = combineReducers({
  game: gameSlice,
});

export type tRootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
