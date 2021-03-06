import { createSlice } from '@reduxjs/toolkit';
import { omit, max } from 'lodash';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    data: null,
  },
  reducers: {
    fetchUsers: (state, action) => {
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
    },
    addUser: (state, action) => {
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
            ...action.payload,
          },
        },
      };
    },
    deleteUser: (state, action) => {
      const targetIndex = state.list.findIndex((l) => l === action.payload);
      const newList = [
        ...state.list.slice(0, targetIndex),
        ...state.list.slice(targetIndex + 1),
      ];
      const newData = omit(state.data, action.payload);

      return {
        ...state,
        list: newList,
        data: newData,
      };
    },
  },
});

export const { fetchUsers, addUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
