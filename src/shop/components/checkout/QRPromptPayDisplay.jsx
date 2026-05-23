import PropTypes from 'prop-types';
import { PAYMENT_METHODS } from './constants.js';

/**
 * QRPromptPayDisplay Component
 *
 * Displays QR code image and payment instructions for QR PromptPay payment method.
 * Shows/hides based on payment method selection.
 *
 * Validates: Requirements 5.4
 */
export default function QRPromptPayDisplay({ isVisible, qrCodeImage, instructions }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="qr-promptpay-display mt-6 p-6 border-2 border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        QR PromptPay Payment
      </h3>

      {/* QR Code Section */}
      <div className="flex flex-col items-center mb-6">
        {qrCodeImage ? (
          <div className="qr-code-container mb-4">
            <img
              src={qrCodeImage}
              alt="QR Code for PromptPay payment"
              className="w-48 h-48 border-2 border-gray-300 rounded-lg"
              data-testid="qr-code-image"
            />
          </div>
        ) : (
          <div
            className="w-48 h-48 bg-gray-300 border-2 border-gray-400 rounded-lg flex items-center justify-center mb-4"
            data-testid="qr-code-placeholder"
          >
            <span className="text-gray-600 text-center px-4">
              QR Code will be displayed here
            </span>
          </div>
        )}
      </div>

      {/* Instructions Section */}
      <div className="instructions-section bg-white p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-gray-900 mb-3">
          How to pay with PromptPay:
        </h4>
        {instructions != null ? (
          <div
            className="text-sm text-gray-700 whitespace-pre-wrap"
            data-testid="payment-instructions"
          >
            {instructions}
          </div>
        ) : (
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Open your bank's mobile app or PromptPay app</li>
            <li>Select "Scan QR Code" or "Pay by QR"</li>
            <li>Scan the QR code displayed above</li>
            <li>Review the payment details and confirm</li>
            <li>Your payment will be processed instantly</li>
          </ol>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
        <p>
          <strong>Note:</strong> PromptPay is available 24/7. Your payment will be
          confirmed immediately after scanning and confirming in your bank app.
        </p>
      </div>
    </div>
  );
}

QRPromptPayDisplay.propTypes = {
  /**
   * Whether to display the QR PromptPay section
   */
  isVisible: PropTypes.bool.isRequired,
  /**
   * URL or data URI of the QR code image
   */
  qrCodeImage: PropTypes.string,
  /**
   * Custom payment instructions (optional, defaults to standard instructions)
   */
  instructions: PropTypes.string,
};

QRPromptPayDisplay.defaultProps = {
  isVisible: false,
  qrCodeImage: null,
  instructions: null,
};
