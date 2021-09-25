import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { has } from 'lodash';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUser} from '../../../reducers/users';
import './index.scss';

const AddUserModal = ({
  onHide,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = data => {
    const { name, email } = data;

    dispatch(addUser({
      name,
      email,
    }))
    onHide();
  };

  const inputClassName = name => cx('input-field', {
    'is-error': has(errors, name),
  });

  return (
    <div className="add-user-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add User</h3>
        </div>
        <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-input-wrapper">
            <label htmlFor="name-input">Name:</label>
            <input
              {...register('name', { required: true })}
              id="name-input"
              className={inputClassName('name')}
              type="text"
            />
          </div>
          <div className="text-input-wrapper">
            <label htmlFor="email-input">Email:</label>
            <input
              {...register('email', { required: true })}
              id="email-input"
              className={inputClassName('email')}
              type="email"
            />
          </div>
          <div className="buttons-wrapper">
            <button type="button" onClick={onHide}>Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddUserModal.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default React.memo(AddUserModal);
