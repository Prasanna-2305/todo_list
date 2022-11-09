import {
  ADD_TODO,
  DELETE_TODO,
  STATUS,
  TODO_REQUEST,
  TODO_SUCCESS,
  EDIT_TODO,
  GET_USER,
} from "./actionTypes";

const initialState = {
  list: [],
  loading: false,
  error: "",
  user: {},
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        list: [...state.list, { todo: action.payload }],
      };

    case DELETE_TODO:
      const updatedList = state.list.filter((li) => li._id !== action.payload);

      return {
        ...state,
        list: updatedList,
      };

    case TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.list,
        error: "",
      };

    case STATUS:
      const { toDoId, status } = action.payload;
      const changeStatus = state.list.find((list) => list._id === toDoId);
      const statusUpdated = { ...changeStatus, status: status };
      const updateList = state.list.map((list) =>
        list._id === toDoId ? statusUpdated : list
      );
      return {
        ...state,
        list: updateList,
      };

    case EDIT_TODO:
      const { id, todo } = action.payload;
      const edit_title = state.list.find((list) => list._id === id);
      const edit_item = { ...edit_title, todo: todo };
      const update_List = state.list.map((list) =>
        list._id === id ? edit_item : list
      );
      return { ...state, list: update_List };

    case GET_USER:
      return {
        ...state,
        loading: false,
        user: { ...action.payload },
      };

    default:
      return state;
  }
};
export default TodoReducer;
