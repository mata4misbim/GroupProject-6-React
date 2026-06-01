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
    <div className="space-y-2 mb-6">
      {paymentMethods.map((method) => (
        <label
          key={method.id}
          onClick={() => handleMethodChange(method.id)}
          className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all border ${
            localSelected === method.id
              ? 'border-white/30 bg-white/8'
              : 'border-white/8 bg-white/3 hover:bg-white/6'
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
            localSelected === method.id ? 'border-white' : 'border-white/30'
          }`}>
            {localSelected === method.id && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <span className="text-lg">{method.icon}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{method.label}</p>
            <p className="text-xs text-white/40 mt-0.5">{method.description}</p>
          </div>
        </label>
      ))}
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
