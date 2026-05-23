/**
 * Application constants
 */

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  QR_PROMPTPAY: 'qr_promptpay',
};

export const DISCOUNT_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const PRODUCT_TYPES = {
  DIGITAL: 'digital',
  MERCHANDISE: 'merchandise',
};

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  POSTAL_CODE_REGEX: /^\d+$/,
  DISCOUNT_CODE_REGEX: /^[a-zA-Z0-9]{5,20}$/,
  CARD_NUMBER_REGEX: /^\d{16}$/,
  CVV_REGEX: /^\d{3,4}$/,
  EXPIRY_DATE_REGEX: /^(0[1-9]|1[0-2])\/\d{2}$/,
};

export const RESPONSIVE_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
};

export const TOUCH_TARGET_SIZE = 44; // pixels

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_POSTAL_CODE: 'Postal code must contain only digits',
  INVALID_DISCOUNT_CODE: 'Discount code must be 5-20 alphanumeric characters',
  INVALID_CARD_NUMBER: 'Card number must be 16 digits',
  INVALID_CVV: 'CVV must be 3-4 digits',
  INVALID_EXPIRY_DATE: 'Expiry date must be in MM/YY format',
  EMPTY_CART: 'Your cart is empty. Please add items before checkout',
  PAYMENT_METHOD_REQUIRED: 'Please select a payment method',
  DISCOUNT_CODE_NOT_FOUND: 'This discount code is not valid',
  DISCOUNT_CODE_EXPIRED: 'This discount code has expired',
  DISCOUNT_CODE_LIMIT_EXCEEDED: 'This discount code has reached its usage limit',
  PAYMENT_PROCESSING_ERROR: 'An error occurred while processing your payment. Please try again',
  ORDER_SUBMISSION_ERROR: 'An error occurred while submitting your order. Please try again',
};

export const SUCCESS_MESSAGES = {
  DISCOUNT_APPLIED: 'Discount code applied successfully',
  ORDER_SUBMITTED: 'Your order has been submitted successfully',
};
