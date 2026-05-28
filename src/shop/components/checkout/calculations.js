/**
 * Calculation utility functions for cart and order totals
 */

/**
 * Calculates the subtotal for a single cart item
 * @param {number} unitPrice - Price per unit
 * @param {number} quantity - Quantity of items
 * @returns {number} Subtotal (unitPrice * quantity)
 */
export const calculateItemSubtotal = (unitPrice, quantity) => {
  return unitPrice * quantity;
};

/**
 * Calculates the total subtotal for all cart items
 * @param {Array} cartItems - Array of cart items
 * @returns {number} Total subtotal
 */
export const calculateCartSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + calculateItemSubtotal(item.unitPrice, item.quantity);
  }, 0);
};

/**
 * Calculates discount amount based on discount type and value
 * @param {number} subtotal - Subtotal amount
 * @param {'percentage' | 'fixed'} discountType - Type of discount
 * @param {number} discountValue - Discount value (percentage or fixed amount)
 * @returns {number} Discount amount
 */
export const calculateDiscountAmount = (subtotal, discountType, discountValue) => {
  if (discountType === 'percentage') {
    return (subtotal * discountValue) / 100;
  }
  if (discountType === 'fixed') {
    return discountValue;
  }
  return 0;
};

/**
 * Calculates the final order total
 * @param {number} subtotal - Subtotal amount
 * @param {number} discountAmount - Discount amount (default 0)
 * @returns {number} Final total
 */
export const calculateOrderTotal = (subtotal, discountAmount = 0) => {
  return Math.max(0, subtotal - discountAmount);
};

/**
 * Formats a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Rounds a number to 2 decimal places
 * @param {number} value - Value to round
 * @returns {number} Rounded value
 */
export const roundToTwoDecimals = (value) => {
  return Math.round(value * 100) / 100;
};
