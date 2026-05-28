/**
 * Validation utility functions
 */

import { VALIDATION_RULES, ERROR_MESSAGES } from './constants.js';

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
  }
  return { isValid: true, error: null };
};

/**
 * Validates a postal code
 * @param {string} postalCode - Postal code to validate
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export const validatePostalCode = (postalCode) => {
  if (!postalCode || postalCode.trim() === '') {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  if (!VALIDATION_RULES.POSTAL_CODE_REGEX.test(postalCode)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_POSTAL_CODE };
  }
  return { isValid: true, error: null };
};

/**
 * Validates a required text field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of field for error message
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export const validateRequiredField = (value, fieldName = 'This field') => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true, error: null };
};

/**
 * Validates a discount code format
 * @param {string} code - Discount code to validate
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export const validateDiscountCodeFormat = (code) => {
  if (!code || code.trim() === '') {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  const trimmedCode = code.trim();
  if (!VALIDATION_RULES.DISCOUNT_CODE_REGEX.test(trimmedCode)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_DISCOUNT_CODE };
  }
  return { isValid: true, error: null };
};

/**
 * Validates a credit card number
 * @param {string} cardNumber - Card number to validate (spaces allowed)
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export const validateCardNumber = (cardNumber) => {
  if (!cardNumber || cardNumber.trim() === '') {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  const cleanedNumber = cardNumber.replace(/\s/g, '');
  if (!VALIDATION_RULES.CARD_NUMBER_REGEX.test(cleanedNumber)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_CARD_NUMBER };
  }
  return { isValid: true, error: null };
};

/**
 * Validates a CVV
 * @param {string} cvv - CVV to validate
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export const validateCVV = (cvv) => {
  if (!cvv || cvv.trim() === '') {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  if (!VALIDATION_RULES.CVV_REGEX.test(cvv)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_CVV };
  }
  return { isValid: true, error: null };
};

/**
 * Validates an expiry date in MM/YY format
 * @param {string} expiryDate - Expiry date to validate
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export const validateExpiryDate = (expiryDate) => {
  if (!expiryDate || expiryDate.trim() === '') {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  if (!VALIDATION_RULES.EXPIRY_DATE_REGEX.test(expiryDate)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EXPIRY_DATE };
  }
  return { isValid: true, error: null };
};

/**
 * Validates shipping information
 * @param {Object} shippingInfo - Shipping information object
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateShippingInformation = (shippingInfo) => {
  const errors = {};

  const fullNameValidation = validateRequiredField(shippingInfo.fullName, 'Full name');
  if (!fullNameValidation.isValid) {
    errors.fullName = fullNameValidation.error;
  }

  const emailValidation = validateEmail(shippingInfo.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const addressValidation = validateRequiredField(shippingInfo.address, 'Address');
  if (!addressValidation.isValid) {
    errors.address = addressValidation.error;
  }

  const cityValidation = validateRequiredField(shippingInfo.city, 'City');
  if (!cityValidation.isValid) {
    errors.city = cityValidation.error;
  }

  const postalCodeValidation = validatePostalCode(shippingInfo.postalCode);
  if (!postalCodeValidation.isValid) {
    errors.postalCode = postalCodeValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates credit card payment details
 * @param {Object} paymentDetails - Payment details object
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateCreditCardDetails = (paymentDetails) => {
  const errors = {};

  const cardNumberValidation = validateCardNumber(paymentDetails.cardNumber);
  if (!cardNumberValidation.isValid) {
    errors.cardNumber = cardNumberValidation.error;
  }

  const cardholderNameValidation = validateRequiredField(paymentDetails.cardholderName, 'Cardholder name');
  if (!cardholderNameValidation.isValid) {
    errors.cardholderName = cardholderNameValidation.error;
  }

  const expiryDateValidation = validateExpiryDate(paymentDetails.expiryDate);
  if (!expiryDateValidation.isValid) {
    errors.expiryDate = expiryDateValidation.error;
  }

  const cvvValidation = validateCVV(paymentDetails.cvv);
  if (!cvvValidation.isValid) {
    errors.cvv = cvvValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a discount code comprehensively
 * Checks format, existence, expiration, and usage limit
 * @param {string} code - Discount code to validate
 * @param {Array} discountDatabase - Array of discount code objects from database
 * @returns {Object} { isValid: boolean, error: string | null, discount: Object | null }
 */
export const validateDiscountCode = (code, discountDatabase = []) => {
  // Step 1: Validate format
  const formatValidation = validateDiscountCodeFormat(code);
  if (!formatValidation.isValid) {
    return { isValid: false, error: formatValidation.error, discount: null };
  }

  // Step 2: Check if code exists in database
  const normalizedCode = code.toUpperCase().trim();
  const discountRecord = discountDatabase.find(
    (discount) => discount.code.toUpperCase() === normalizedCode
  );

  if (!discountRecord) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.DISCOUNT_CODE_NOT_FOUND,
      discount: null,
    };
  }

  // Step 3: Check if code is expired
  if (discountRecord.expiryDate) {
    const expiryDate = new Date(discountRecord.expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (expiryDate < today) {
      return {
        isValid: false,
        error: ERROR_MESSAGES.DISCOUNT_CODE_EXPIRED,
        discount: null,
      };
    }
  }

  // Step 4: Check if code has exceeded usage limit
  if (discountRecord.usageLimit && discountRecord.usageCount >= discountRecord.usageLimit) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.DISCOUNT_CODE_LIMIT_EXCEEDED,
      discount: null,
    };
  }

  // Step 5: Check if code is active
  if (discountRecord.isActive === false) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.DISCOUNT_CODE_NOT_FOUND,
      discount: null,
    };
  }

  // All validations passed
  return {
    isValid: true,
    error: null,
    discount: {
      code: discountRecord.code,
      type: discountRecord.type,
      value: discountRecord.value,
    },
  };
};
