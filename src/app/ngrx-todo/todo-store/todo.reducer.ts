import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './todo.actions';
import { initialState } from './todo.state';

// export const initialState = 0;

export const todoReducer = createReducer(
  initialState,
  // on(increment, (state) => state + 1),
  // on(decrement, (state) => state - 1),
  // on(reset, (state) => 0)
  on(increment, (state) => ({ ...state, count: state.count + 1 })),
  on(decrement, (state) => ({ ...state, count: state.count - 1 })),
  on(reset, (state) => ({ ...state, count: 0 }))
);
