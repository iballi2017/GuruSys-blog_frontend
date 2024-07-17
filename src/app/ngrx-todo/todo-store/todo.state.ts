export interface TodoState {
  count: number;
  todoList: any[];
}

export const initialState: TodoState = {
  count: 0,
  todoList: [],
};
