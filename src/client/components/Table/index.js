import React from 'react';
import PropTypes from 'prop-types';
import TableItem from './TableItem';
import './index.scss';

const Table = ({
  userList,
}) => {
  if (userList.length === 0) return null;

  return (
    <div className="table-index">
      <div className="table">
        <div className="table-header">
          <div className="table-row">
            <div className="cell short-cell">
              <span>ID</span>
            </div>
            <div className="cell long-cell">
              <span>Name</span>
            </div>
            <div className="cell long-cell">
              <span>Email</span>
            </div>
            <div className="cell short-cell">
              <span>Action</span>
            </div>
          </div>
        </div>
        <div className="table-content">
          {userList.map(data => (
            <TableItem
              key={data.id}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
};

export default React.memo(Table);