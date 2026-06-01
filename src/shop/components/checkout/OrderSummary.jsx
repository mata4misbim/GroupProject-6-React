import PropTypes from 'prop-types';
import {
  calculateCartSubtotal,
  calculateOrderTotal,
  formatCurrency,
  roundToTwoDecimals,
} from './calculations.js';

/**
 * OrderSummary Component
 * Displays real-time order calculations including subtotal, discount, and final total
 * with selected payment method information
 *
 * **Validates: Requirements 7.1, 7.3, 7.4, 7.5, 7.6**
 */
export default function OrderSummary({
  cartItems = [],
  discountAmount = 0,
  selectedPaymentMethod = null,
}) {
  // Calculate subtotal from cart items
  const subtotal = roundToTwoDecimals(calculateCartSubtotal(cartItems));

  // Ensure discount amount is valid
  const validDiscountAmount = roundToTwoDecimals(Math.max(0, discountAmount));

  // Calculate final total
  const total = roundToTwoDecimals(calculateOrderTotal(subtotal, validDiscountAmount));

  // Format payment method display text
  const getPaymentMethodLabel = () => {
    if (!selectedPaymentMethod) return 'Not selected';
    if (selectedPaymentMethod === 'credit_card') return 'Credit Card';
    if (selectedPaymentMethod === 'qr_promptpay') return 'QR PromptPay';
    return selectedPaymentMethod;
  };

  return (
    <div className="bg-transparent p-6 shadow-sm">
      {/* Header */}
      <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

      {/* Subtotal Section */}
      <div className="border-b border-white/10 pb-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-white/55">Subtotal</span>
          <span className="text-white font-medium" data-testid="subtotal">
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>

      {/* Discount Section - Only show if discount is applied */}
      {validDiscountAmount > 0 && (
        <div className="border-b border-white/10 pb-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-white/55">Discount</span>
            <span className="text-green-400 font-medium" data-testid="discount-amount">
              -{formatCurrency(validDiscountAmount)}
            </span>
          </div>
        </div>
      )}

      {/* Total Section */}
      <div className="bg-white/5 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total</span>
          <span
            className="text-2xl font-bold text-white"
            data-testid="total-amount"
          >
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-white/55">Payment Method</span>
          <span
            className="text-white font-medium"
            data-testid="payment-method"
          >
            {getPaymentMethodLabel()}
          </span>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  /**
   * Array of cart items with unitPrice and quantity
   */
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      unitPrice: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
  /**
   * Discount amount to apply (0 if no discount)
   */
  discountAmount: PropTypes.number,
  /**
   * Selected payment method ('credit_card', 'qr_promptpay', or null)
   */
  selectedPaymentMethod: PropTypes.oneOf([
    'credit_card',
    'qr_promptpay',
    null,
  ]),
};
