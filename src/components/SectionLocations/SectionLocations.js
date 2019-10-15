import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import barcelonaImage from './images/Barcelona.jpg';
import sevillaImage from './images/Sevilla.jpg';
import madridImage from './images/Madrid.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionLocations.listingsInLocation"
          values={{ location: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Barcelona',
          barcelonaImage,
          '?address=Barcelona%20Province%2C%20Spain&bounds=42.323301%2C2.839469%2C41.092783%2C1.359622'
        )}
        {locationLink(
          'Madrid (Soon)',
          madridImage,
          '?address=Madrid%2C%20Madrid%2C%20Spain&bounds=40.643313%2C-3.517964%2C40.311994%2C-3.888965'
        )}
        {locationLink(
          'Sevilla (soon)',
          sevillaImage,
          '?address=Sevilla%20la%20Nueva%2C%20Madrid%2C%20Spain&bounds=40.380956%2C-3.998706%2C40.332282%2C-4.076993'
        )}
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
