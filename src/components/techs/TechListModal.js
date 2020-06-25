import React, { useEffect } from 'react';
import TechItem from './TechItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTechs } from '../../actions/techActions';
import Preloader from '../layout/Preloader';

const TechListModal = ({ tech: { techs, loading }, getTechs }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  if (loading || !techs) {
    return <Preloader />;
  }

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <div className='row'>
          {!loading &&
            techs.map(tech => <TechItem tech={tech} key={tech.id} />)}
        </div>
        {/* <ul className='collection'>
          {!loading &&
            techs.map(tech => <TechItem tech={tech} key={tech.id} />)}
        </ul> */}
      </div>
    </div>
  );
};

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
};

// Get state data and pass it as prop to connect(), along with the action getTechs
const mapStateToProps = state => ({
  tech: state.tech
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
