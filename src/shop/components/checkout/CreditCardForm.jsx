import { useState, useCallback } from 'react';
import {
  validateCardNumber,
  validateCVV,
  validateExpiryDate,
  validateRequiredField,
} from './validation.js';
import { PAYMENT_METHODS } from './constants.js';

/**
 * CreditCardForm Component
 * 
 * Displays form fields for credit card payment details.
 * Implements validation for card number (16 digits), expiry format (MM/YY), CVV (3-4 digits).
 * Shows/hides based on payment method selection.
 * 
 * Validates: Requirements 5.3
 */
export default function CreditCardForm({
  isVisible,
  onPaymentDetailsChange,
  initialValues,
}) {
  const [formData, setFormData] = useState(
    initialValues || {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
    }
  );

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate individual field
  const validateField = useCallback((fieldName, value) => {
    let validation;

    switch (fieldName) {
      case 'cardNumber':
        validation = validateCardNumber(value);
        break;
      case 'cardholderName':
        validation = validateRequiredField(value, 'Cardholder name');
        break;
      case 'expiryDate':
        validation = validateExpiryDate(value);
        break;
      case 'cvv':
        validation = validateCVV(value);
        break;
      default:
        return null;
    }

    return validation;
  }, []);

  // Handle field change
  const handleFieldChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      let processedValue = value;

      // Format card number with spaces every 4 digits
      if (name === 'cardNumber') {
        processedValue = value
          .replace(/\s/g, '')
          .replace(/(\d{4})/g, '$1 ')
          .trim();
      }

      // Format expiry date as MM/YY
      if (name === 'expiryDate') {
        processedValue = value
          .replace(/\D/g, '')
          .slice(0, 4);
        if (processedValue.length >= 2) {
          processedValue = `${processedValue.slice(0, 2)}/${processedValue.slice(2)}`;
        }
      }

      // CVV should only be digits
      if (name === 'cvv') {
        processedValue = value.replace(/\D/g, '').slice(0, 4);
      }

      const newFormData = {
        ...formData,
        [name]: processedValue,
      };

      setFormData(newFormData);

      // Validate if field has been touched
      if (touched[name]) {
        const validation = validateField(name, processedValue);
        if (validation) {
          if (validation.isValid) {
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[name];
              return newErrors;
            });
          } else {
            setErrors((prev) => ({
              ...prev,
              [name]: validation.error,
            }));
          }
        }
      }

      // Notify parent component of changes
      if (onPaymentDetailsChange) {
        onPaymentDetailsChange({
          method: PAYMENT_METHODS.CREDIT_CARD,
          ...newFormData,
        });
      }
    },
    [formData, touched, validateField, onPaymentDetailsChange]
  );

  // Handle field blur
  const handleFieldBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      const validation = validateField(name, formData[name]);
      if (validation) {
        if (validation.isValid) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
          });
        } else {
          setErrors((prev) => ({
            ...prev,
            [name]: validation.error,
          }));
        }
      }
    },
    [formData, validateField]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div className="credit-card-form mt-6 p-6 border-2 border-gray-200 rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Credit Card Details
      </h3>

      <form className="space-y-4">
        {/* Card Number Field */}
        <div className="form-group">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            className={`
              w-full px-3 py-2 border rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                errors.cardNumber && touched.cardNumber
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }
            `}
            aria-label="Card number"
            aria-invalid={!!(errors.cardNumber && touched.cardNumber)}
            aria-describedby={
              errors.cardNumber && touched.cardNumber ? 'cardNumber-error' : undefined
            }
          />
          {errors.cardNumber && touched.cardNumber && (
            <p id="cardNumber-error" className="text-red-600 text-sm mt-1">
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Cardholder Name Field */}
        <div className="form-group">
          <label
            htmlFor="cardholderName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            placeholder="John Doe"
            className={`
              w-full px-3 py-2 border rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                errors.cardholderName && touched.cardholderName
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }
            `}
            aria-label="Cardholder name"
            aria-invalid={!!(errors.cardholderName && touched.cardholderName)}
            aria-describedby={
              errors.cardholderName && touched.cardholderName
                ? 'cardholderName-error'
                : undefined
            }
          />
          {errors.cardholderName && touched.cardholderName && (
            <p id="cardholderName-error" className="text-red-600 text-sm mt-1">
              {errors.cardholderName}
            </p>
          )}
        </div>

        {/* Expiry Date and CVV Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date Field */}
          <div className="form-group">
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              placeholder="MM/YY"
              maxLength="5"
              className={`
                w-full px-3 py-2 border rounded-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${
                  errors.expiryDate && touched.expiryDate
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300'
                }
              `}
              aria-label="Expiry date"
              aria-invalid={!!(errors.expiryDate && touched.expiryDate)}
              aria-describedby={
                errors.expiryDate && touched.expiryDate
                  ? 'expiryDate-error'
                  : undefined
              }
            />
            {errors.expiryDate && touched.expiryDate && (
              <p id="expiryDate-error" className="text-red-600 text-sm mt-1">
                {errors.expiryDate}
              </p>
            )}
          </div>

          {/* CVV Field */}
          <div className="form-group">
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              placeholder="123"
              maxLength="4"
              className={`
                w-full px-3 py-2 border rounded-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${
                  errors.cvv && touched.cvv
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300'
                }
              `}
              aria-label="CVV"
              aria-invalid={!!(errors.cvv && touched.cvv)}
              aria-describedby={
                errors.cvv && touched.cvv ? 'cvv-error' : undefined
              }
            />
            {errors.cvv && touched.cvv && (
              <p id="cvv-error" className="text-red-600 text-sm mt-1">
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
          <p>
            <strong>🔒 Secure:</strong> Your card information is encrypted and
            secure. We never store your full card details.
          </p>
        </div>
      </form>
    </div>
  );
}

CreditCardForm.defaultProps = {
  isVisible: false,
  onPaymentDetailsChange: null,
  initialValues: null,
};
