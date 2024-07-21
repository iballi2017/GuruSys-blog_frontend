import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

// export const GET_TODO_LSIT = createAction('[] GET TODO LIST');
// export const ADD_TODO = createAction('[] ADD TODO');
// export const DELETE_TODO = createAction('[] DELETE TODO');
