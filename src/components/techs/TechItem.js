import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTech, updateTech } from '../../actions/techActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech, updateTech, deleteTech }) => {
  const [showEdit, setShowEdit] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onDelete = () => {
    deleteTech(tech.id);
    M.toast({ html: 'Technician deleted' });
  };

  const onUpdate = () => {
    const updateFields = {
      id: tech.id
    };
    updateFields.firstName = firstName ? firstName : tech.firstName;
    updateFields.lastName = lastName ? lastName : tech.lastName;
    updateTech(updateFields);
    M.toast({ html: 'Technician updated' });
    reset();
  };

  const reset = () => {
    setShowUpdate(false);
    setShowEdit(true);
    setFirstName('');
    setLastName('');
  };

  return (
    <div className='form col s12'>
      <div className='row'>
        {showUpdate ? (
          <Fragment>
            <div className='input-field col s3'>
              <input
                type='text'
                name='firstName'
                defaultValue={tech.firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className='input-field col s3'>
              <input
                type='text'
                name='lastName'
                defaultValue={tech.lastName}
                onChange={e => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </Fragment>
        ) : (
          <div className='col s6'>
            {tech.firstName} {tech.lastName}
          </div>
        )}
        <div className='col s6'>
          <a href='#!' className='secondary-content' onClick={onDelete}>
            <i className='material-icons grey-text'>delete</i>
          </a>
          {showEdit && (
            <a
              href='#!'
              className='secondary-content'
              onClick={() => {
                setShowEdit(false);
                setShowUpdate(true);
              }}
            >
              <i className='material-icons grey-text'>edit</i>
            </a>
          )}
          {showUpdate && (
            <Fragment>
              <a
                type='reset'
                href='#!'
                className='secondary-content'
                onClick={reset}
              >
                <i className='material-icons grey-text'>cancel</i>
              </a>
              <a href='#!' className='secondary-content' onClick={onUpdate}>
                <i className='material-icons grey-text'>save</i>
              </a>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
  updateTech: PropTypes.func.isRequired
};

export default connect(null, { deleteTech, updateTech })(TechItem);
