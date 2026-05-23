import { useState } from 'react';
import PropTypes from 'prop-types';
import { PAYMENT_METHODS } from './constants.js';


/**
 * PaymentMethodSelector Component
 *
 * Allows users to select between two payment methods: Credit Card and QR PromptPay.
 * Ensures only one method is selected at a time and highlights the selected option.
 *
 * Validates: Requirements 5.1, 5.2, 5.5
 */
export default function PaymentMethodSelector({ onMethodSelect, selectedMethod }) {
  const [localSelected, setLocalSelected] = useState(selectedMethod || PAYMENT_METHODS.CREDIT_CARD);

  const handleMethodChange = (method) => {
    setLocalSelected(method);
    if (onMethodSelect) {
      onMethodSelect(method);
    }
  };

  const paymentMethods = [
    {
      id: PAYMENT_METHODS.CREDIT_CARD,
      label: 'Credit Card',
      description: 'Pay with your credit or debit card',
      icon: '💳',
    },
    {
      id: PAYMENT_METHODS.QR_PROMPTPAY,
      label: 'QR PromptPay',
      description: 'Scan QR code to pay instantly from your bank',
      icon: '📱',
    },
  ];

  return (
    <div className="payment-method-selector">
      <fieldset className="border-0 p-0 m-0">
        <legend className="text-lg font-semibold mb-4 text-gray-900">
          Select Payment Method
        </legend>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              onClick={() => handleMethodChange(method.id)}
              className={`
                flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all
                ${
                  localSelected === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <input
                type="radio"
                name="payment-method"
                value={method.id}
                checked={localSelected === method.id}
                onChange={() => {}}
                className="mt-1 w-4 h-4 text-blue-600 cursor-pointer"
                aria-label={`Select ${method.label}`}
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-medium text-gray-900">{method.label}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

PaymentMethodSelector.propTypes = {
  onMethodSelect: PropTypes.func,
  selectedMethod: PropTypes.oneOf([
    PAYMENT_METHODS.CREDIT_CARD,
    PAYMENT_METHODS.QR_PROMPTPAY,
  ]),
};

PaymentMethodSelector.defaultProps = {
  onMethodSelect: null,
  selectedMethod: PAYMENT_METHODS.CREDIT_CARD,
};
