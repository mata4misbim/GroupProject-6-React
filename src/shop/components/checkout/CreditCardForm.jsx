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
    <div className="credit-card-form mt-4 pt-4 border-t border-white/8">
      <h3 className="text-[13px] font-semibold uppercase tracking-widest text-white/40 mb-4">
        Card Details
      </h3>

      <form className="space-y-3">
        {/* Card Number Field */}
        <div>
          <label htmlFor="cardNumber" className="block text-xs font-medium text-white/50 mb-1.5">
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
            className={`w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 text-white placeholder:text-white/20 border focus:outline-none focus:ring-1 transition-all ${
              errors.cardNumber && touched.cardNumber
                ? 'border-accent/60 focus:ring-accent/30'
                : 'border-white/10 focus:ring-white/20 focus:border-white/25'
            }`}
            aria-label="Card number"
            aria-invalid={!!(errors.cardNumber && touched.cardNumber)}
            aria-describedby={
              errors.cardNumber && touched.cardNumber ? 'cardNumber-error' : undefined
            }
          />
          {errors.cardNumber && touched.cardNumber && (
            <p id="cardNumber-error" className="text-accent text-xs mt-1">
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Cardholder Name Field */}
        <div className="form-group">
          <label
            htmlFor="cardholderName"
            className="block text-xs font-medium text-white/50 mb-1.5"
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
              w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 text-white placeholder:text-white/20 border focus:outline-none focus:ring-1 transition-all ${
              errors.cardholderName && touched.cardholderName
                ? 'border-accent/60 focus:ring-accent/30'
                : 'border-white/10 focus:ring-white/20 focus:border-white/25'
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
            <p id="cardholderName-error" className="text-accent text-xs mt-1">
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
              className="block text-xs font-medium text-white/50 mb-1.5"
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
                w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 text-white placeholder:text-white/20 border focus:outline-none focus:ring-1 transition-all ${
                errors.expiryDate && touched.expiryDate
                  ? 'border-accent/60 focus:ring-accent/30'
                  : 'border-white/10 focus:ring-white/20 focus:border-white/25'
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
              <p id="expiryDate-error" className="text-accent text-xs mt-1">
                {errors.expiryDate}
              </p>
            )}
          </div>

          {/* CVV Field */}
          <div className="form-group">
            <label
              htmlFor="cvv"
              className="block text-xs font-medium text-white/50 mb-1.5"
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
                w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 text-white placeholder:text-white/20 border focus:outline-none focus:ring-1 transition-all ${
                errors.cvv && touched.cvv
                  ? 'border-accent/60 focus:ring-accent/30'
                  : 'border-white/10 focus:ring-white/20 focus:border-white/25'
              }
              `}
              aria-label="CVV"
              aria-invalid={!!(errors.cvv && touched.cvv)}
              aria-describedby={
                errors.cvv && touched.cvv ? 'cvv-error' : undefined
              }
            />
            {errors.cvv && touched.cvv && (
              <p id="cvv-error" className="text-accent text-xs mt-1">
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-4 p-3 bg-white/4 border border-white/8 rounded-xl text-sm text-white/50">
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
