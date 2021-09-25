export const FETCH_USERS = 'ACTION/FETCH_USERS';
export const ADD_USER = 'ACTION/ADD_USER';
export const DELETE_USER = 'ACTION/DELETE_USER';

export function fetchUsers(users, dispatch) {
  dispatch({
    type: FETCH_USERS,
    payload: users,
  });
}

export function addUser(user, dispatch) {
  dispatch({
    type: ADD_USER,
    payload: user,
  });
}

export function deleteUser(userId, dispatch) {
  dispatch({
    type: DELETE_USER,
    payload: userId,
  });
}
