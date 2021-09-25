import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  includes,
  isEmpty,
  orderBy,
  debounce,
} from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../reducers/users';
import Table from './Table';
import AddUserModal from './AddUserModal';
import { getUsers } from '../../api/users';
import { useApi } from '../../utils/api';
import './app.scss';

const ASC_ORDER_ID_OPTION = 'ASC_ORDER_ID_OPTION';
const DESC_ORDER_ID_OPTION = 'DESC_ORDER_ID_OPTION';
const ASC_ORDER_NAME_OPTION = 'ASC_ORDER_NAME_OPTION';

const App = () => {
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [modalShown, setModalShown] = useState(false);
  const [res, doGetUsers] = useApi(getUsers);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.users.list);
  const data = useSelector((state) => state.users.data);

  useEffect(() => {
    if (isEmpty(data)) {
      doGetUsers();
    }
  }, []);

  useEffect(() => {
    if (!res.loading && !isEmpty(res.data)) {
      dispatch(fetchUsers(res.data));
    }
  }, [res.loading, res.data]);

  const onHide = useCallback(
    () => {
      setModalShown(false);
    },
    [],
  );

  const onFilterInputChange = () => (value) => {
    setFilterBy(value);
  };

  const debouncedOnFilterInputChange = useMemo(
    (value) => debounce(onFilterInputChange(value), 300)
  , []);

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

  const userList = sortList(list.map(userId => data[userId]).filter(user => {
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
                onChange={e => debouncedOnFilterInputChange(e.target.value)}
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
        {res.loading ? (
          <h2 className="loading">Loading...</h2>
        ) : (
          <Table userList={userList} />
        )}
      </div>
      {modalShown && (
        <AddUserModal onHide={onHide} />
      )}
    </>
  );
}

export default App;
