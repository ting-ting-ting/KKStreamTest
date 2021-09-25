import { omit, max } from 'lodash';
import {
  FETCH_USERS,
  ADD_USER,
  DELETE_USER,
} from './actions';

const initialState = {
  list: [],
  data: null,
};

function reducer(state, action) {
  switch (action.type) {
    case FETCH_USERS: {
      const list = action.payload.map(user => user.id);
      const data = action.payload.reduce((prev, curr) => ({
        ...prev,
        [curr.id]: curr,
      }), {});

      return {
        ...state,
        list,
        data,
      };
    }
    case ADD_USER: {
      const newUserId = max(state.list) + 1;

      return {
        ...state,
        list: [
          ...state.list,
          newUserId,
        ],
        data: {
          ...state.data,
          [newUserId]: {
            id: newUserId,
            ...action.payload
          },
        },
      };
    }
    case DELETE_USER: {
      const targetIndex = state.list.findIndex((l) => l === action.payload);
      const newList = [
        ...state.list.slice(0, targetIndex),
        ...state.list.slice(targetIndex + 1)
      ];
      const newData = omit(state.data, action.payload);

      return {
        ...state,
        list: newList,
        data: newData
      };
    }

    default:
      return state;
  }
}

export { reducer, initialState };