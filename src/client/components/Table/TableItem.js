import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const TableItem = ({
  data,
  doDeleteUser,
}) => {
  const onDelete = useCallback(
    () => {
      doDeleteUser(data.id);
    },
    [data.id],
  );

  return (
    <div className="table-row">
      <div className="cell short-cell">{data.id}</div>
      <div className="cell long-cell">{data.name}</div>
      <div className="cell long-cell">{data.email}</div>
      <div className="cell short-cell">
        <button type="button" className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

TableItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  doDeleteUser: PropTypes.func.isRequired,
};

export default React.memo(TableItem);