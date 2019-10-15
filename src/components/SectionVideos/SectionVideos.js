import React from 'react';
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { NamedLink } from '../../components';

import css from './SectionVideos.css';
import featureVideo from './feature.mp4';

const SectionVideos = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
    <ReactPlayer className='react-player' width="100%" height="500px" url={featureVideo} playing controls/>
      </div>
  );
};

SectionVideos.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionVideos.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionVideos;
