import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import questionsData from 'fakeData/questions.json';
import answersData from 'fakeData/answers.json';

export enum eSteps {
  START = 'START',
  GAME = 'GAME',
  RESULT = 'RESULT',
}

export interface iGameState {
  step: keyof typeof eSteps;
  inProgress: boolean;
  questions: any[];
  amount: any[];
  currentCost: number;
  succeededCosts: number[];
  currentAnswer: null | string;
  isChecking: boolean;
}

const initialState: iGameState = {
  step: eSteps.START,
  inProgress: false,
  questions: [],
  amount: [],
  currentCost: 0,
  succeededCosts: [],
  currentAnswer: null,
  isChecking: false,
};

interface iApiResponse {
  data: any[] | any;
}

export const fetchApiQuestions = createAsyncThunk<iApiResponse, void>(
  'api/fetchData',
  async () =>
    // eslint-disable-next-line no-promise-executor-return
    new Promise<iApiResponse>(resolve => resolve({ data: [...questionsData] }))
);

export const fetchApiCheckResult = createAsyncThunk<
  iApiResponse,
  { questionId: string; option: string }
>(
  'api/checkResult',
  async (requestData, thunkAPI) =>
    new Promise<iApiResponse>(resolve => {
      const answers: Record<string, string> = answersData;
      // eslint-disable-next-line no-promise-executor-return
      return setTimeout(() => {
        resolve({
          data: answers[requestData.questionId],
        });
      }, 1000);
    })
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    nextStep(state) {
      if (state.step === eSteps.START || state.step === eSteps.RESULT) {
        state.step = eSteps.GAME;
        state.currentAnswer = null;
        state.amount = [];
        state.currentCost = 0;
        state.succeededCosts = [];
      } else {
        state.step = eSteps.RESULT;
      }
    },
    nextQuestion(state) {
      state.succeededCosts.push(state.currentCost);
      state.currentCost += 1;
      state.currentAnswer = null;
      if (state.currentCost === state.questions.length) {
        state.step = eSteps.RESULT;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchApiQuestions.pending, state => {
        state.inProgress = true;
      })
      .addCase(
        fetchApiQuestions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.inProgress = false;
          state.questions = action.payload.data;
          state.amount = action.payload.data.map(
            (question: any) => question.cost
          );
          state.currentCost = 0;
        }
      )
      .addCase(fetchApiQuestions.rejected, state => {
        state.inProgress = false;
      })
      .addCase(fetchApiCheckResult.pending, state => {
        state.isChecking = true;
      })
      .addCase(
        fetchApiCheckResult.fulfilled,
        (state, action: PayloadAction<{ data: string }>) => {
          state.currentAnswer = action.payload.data;
          state.isChecking = false;
        }
      )
      .addCase(fetchApiCheckResult.rejected, state => {
        state.isChecking = false;
      });
  },
});

export const { nextStep, nextQuestion } = gameSlice.actions;

export default gameSlice.reducer;

// custom selectors
const selectQuestions = (state: any) => state.game.questions;
const selectCurrentCost = (state: any) => state.game.currentCost;
const selectAmount = (state: any) => state.game.amount;

const selectCurrentQuestion = createSelector(
  [selectQuestions, selectCurrentCost],
  (questions, currentCost) => questions[currentCost]
);

const selectTotalScore = createSelector(
  [selectAmount, selectCurrentCost],
  (amount, currentCost) => amount[currentCost - 1] || 0
);

export { selectCurrentQuestion, selectTotalScore };
