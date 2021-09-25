import React, {
  useEffect,
  useState,
  useCallback,
  useReducer,
} from 'react';
import {
  includes,
  isEmpty,
  orderBy,
  debounce,
} from 'lodash';
import { useSelector, useDispatch } from 'react-redux'
import { reducer, initialState } from './reducer/reducer';
import {
  fetchUsers,
  addUser,
  deleteUser,
} from './reducer/actions';
import Table from './Table';
import AddUserModal from './AddUserModal';
import './app.scss';

const ASC_ORDER_ID_OPTION = 'ASC_ORDER_ID_OPTION';
const DESC_ORDER_ID_OPTION = 'DESC_ORDER_ID_OPTION';
const ASC_ORDER_NAME_OPTION = 'ASC_ORDER_NAME_OPTION';

const App = () => {
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [modalShown, setModalShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const doFetchUsers = users => fetchUsers(users, dispatch);
  const doAddUser = user => addUser(user, dispatch);
  const doDeleteUser = userId => deleteUser(userId, dispatch);
  const count = useSelector((state) => state.users.value)

  console.log('count', count)

  useEffect(() => {
    setLoading(true);

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        doFetchUsers(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      })
  }, []);

  const onHide = useCallback(
    () => {
      setModalShown(false);
    },
    [],
  );

  const onFilterInputChange = (e) => {
    setFilterBy(e.target.value);
  };

  const debouncedOnFilterInputChange = debounce(onFilterInputChange, 300);

  const sortList = (list) => {
    switch (sortBy) {
      case ASC_ORDER_ID_OPTION:
        return orderBy(list, 'id', 'asc');

      case DESC_ORDER_ID_OPTION:
        return orderBy(list, 'id', 'desc');

      case ASC_ORDER_NAME_OPTION:
        return orderBy(list, 'name', 'asc');

      default:
        return list;
    };
  };

  const userList = sortList(state.list.map(userId => state.data[userId]).filter(user => {
    if (!isEmpty(filterBy)) {
      return includes(user.name.toLowerCase(), filterBy.toLowerCase());
    }

    return true;
  }));

  return (
    <>
      <div className="app">
        <div className="panel">
          <div className="filters-wrapper">
            <div className="filter">
              <label htmlFor="filter-by-text-input">Filter By:</label>
              <input
                id="filter-by-text-input"
                type="text"
                onChange={debouncedOnFilterInputChange}
              />
            </div>
            <div className="filter">
              <label htmlFor="sort-by-selector">Sort By:</label>
              <select name="sort-by" onChange={e => setSortBy(e.target.value)} id="sort-by-selector">
                <option value="">default</option>
                <option value={ASC_ORDER_ID_OPTION}>id asc</option>
                <option value={DESC_ORDER_ID_OPTION}>id desc</option>
                <option value={ASC_ORDER_NAME_OPTION}>name</option>
              </select>
            </div>
          </div>
          <button type="button" className="add-user-btn" onClick={() => setModalShown(true)}>Add user</button>
        </div>
        {loading ? (
          <h2 className="loading">Loading...</h2>
        ) : (
          <Table
            userList={userList}
            doDeleteUser={doDeleteUser}
          />
        )}
      </div>
      {modalShown && (
        <AddUserModal
          onHide={onHide}
          doAddUser={doAddUser}
        />
      )}
    </>
  );
}

export default App;
