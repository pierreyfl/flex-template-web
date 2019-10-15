import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import { propTypes } from '../../util/types';
import { nonEmptyArray, maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldBirthdayInput, AddImages, ValidationError} from '../../components';
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';
import * as normalizePhoneNumberUS from './normalizePhoneNumberUS';

import css from './EditListingDescriptionForm.css';

const TITLE_MAX_LENGTH = 60;

const ACCEPT_IMAGES = 'image/*';



const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        categories,
        className,
        disabled,
        values,
        images,
        onRemoveImage,
        handleSubmit,
        imageUploadRequested,
        form,
        intl,
        invalid,
        onImageUploadHandler,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = fieldRenderProps;
      
      const imageRequiredMessage = intl.formatMessage({
        id: 'EditListingPhotosForm.imageRequired',
      });
      
      const chooseImageText = (
        <span className={css.chooseImageText}>
          <span className={css.chooseImage}>
            <FormattedMessage id="EditListingDescriptionForm.chooseImage" />
          </span>
        </span>
      );

      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );
      
      const birthdayLabel = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabel' });
      const birthdayLabelMonth = intl.formatMessage({
        id: 'PayoutDetailsForm.birthdayLabelMonth',
      });
      const birthdayLabelYear = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabelYear' });
      
      const birthdayRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.birthdayRequired',
        })
      );
      const birthdayMinAge = validators.ageAtLeast(
        intl.formatMessage(
          {
            id: 'PayoutDetailsForm.birthdayMinAge',
          },
          {
            minAge: 18,
          }
        ),
        18
      );
      
      const phoneLabel = intl.formatMessage({ id: 'PayoutDetailsForm.personalPhoneLabel' });
      const phonePlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.personalPhonePlaceholder' });
      const phoneNumberForUSRequired = validators.required(
        intl.formatMessage({ id: 'PayoutDetailsForm.personalPhoneRequired' })
      );
      
      
      const surnameMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.surname' });
      const surnamePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.surnamePlaceholder',
      });
      const surnameRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.surnameRequired',
      });

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />
            
          <FieldTextInput
            id="surname"
            name="surname"
            className={css.title}
            type="text"
            label={surnameMessage}
            placeholder={surnamePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />
          
          <AddImages
            className={css.imagesField}
            images={images}
            thumbnailClassName={css.thumbnail}
            savedImageAltText={intl.formatMessage({
              id: 'EditListingDescriptionForm.savedImageAltText',
            })}
            onRemoveImage={onRemoveImage}
          >
            <Field
              id="addImage"
              name="addImage"
              accept={ACCEPT_IMAGES}
              form={null}
              label={chooseImageText}
              type="file"
              disabled={imageUploadRequested}
            >
              {fieldprops => {
                const { accept, input, label, type, disabled } = fieldprops;
                const { name } = input;
                const onChange = e => {
                  const file = e.target.files[0];
                  form.change(`addImage`, file);
                  form.blur(`addImage`);
                  onImageUploadHandler(file);
                };
                const inputProps = { accept, id: name, name, onChange, type };
                return (
                  <div className={css.addImageWrapper}>
                    <div className={css.aspectRatioWrapper}>
                      {disabled ? null : (
                        <input {...inputProps} className={css.addImageInput} />
                      )}
                      <label htmlFor={name} className={css.addImage}>
                      {label}
                      </label>
                    </div>
                  </div>
                );
              }}
            </Field>
            <Field
              component={props => {
                const { input, type, meta } = props;
                return (
                  <div className={css.imageRequiredWrapper}>
                    <input {...input} type={type} />
                    <ValidationError fieldMeta={meta} />
                  </div>
                );
              }}
              name="images"
              type="hidden"
            />
          </AddImages>
          <FieldBirthdayInput
            id="birthdate"
            name="birthdate"
            disabled={disabled}
            className={css.description}
            label={birthdayLabel}
            labelForMonth={birthdayLabelMonth}
            labelForYear={birthdayLabelYear}
            format={null}
            valueFromForm={values.birthDate}
            validate={validators.composeValidators(birthdayRequired, birthdayMinAge)}
          />
            
          <FieldTextInput
            id="phonenumber"
            name="phonenumber"
            className={css.description}
            autoComplete="tel-national"
            disabled={disabled}
            format={normalizePhoneNumberUS.format}
            label={phoneLabel}
            parse={normalizePhoneNumberUS.parse}
            placeholder={phonePlaceholder}
            type="text"
            validate={phoneNumberForUSRequired}
          />
            
          
          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />


          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
