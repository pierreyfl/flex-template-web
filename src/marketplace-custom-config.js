/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'spanish',
    label: 'Spanish',
  },
  {
    key: 'catalan',
    label: 'Catalan',
  },
  {
    key: 'english',
    label: 'English',
  },
  {
    key: 'french',
    label: 'French',
  },
  {
    key: 'german',
    label: 'German',
  },
  {
    key: 'italian',
    label: 'Italian',
  },
  {
    key: 'dustch',
    label: 'Dustch',
  },
  {
    key: 'euskera',
    label: 'Euskera',
  },
  {
    key: 'portuguese',
    label: 'Portuguese',
  }
];

export const categories = [
  { key: 'smoke', label: 'Smoke' },
  { key: 'electric', label: 'Electric' },
  { key: 'wood', label: 'Wood' },
  { key: 'other', label: 'Other' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};
