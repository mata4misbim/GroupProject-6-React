import { useState } from 'react';
import { VALIDATION_RULES, ERROR_MESSAGES } from './constants.js';

/**
 * ShippingForm component - Collects and validates shipping information
 * 
 * Manages form state for shipping details with real-time validation feedback.
 * Persists values in component state and provides accessible error messages.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback with validated shipping data
 * @param {Object} [props.initialValues] - Pre-filled form values
 * @returns {JSX.Element} Shipping form with input fields and validation
 */
export default function ShippingForm({ onSubmit, initialValues = {} }) {
  const [formData, setFormData] = useState({
    fullName: initialValues.fullName || '',
    email: initialValues.email || '',
    address: initialValues.address || '',
    city: initialValues.city || '',
    postalCode: initialValues.postalCode || '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Validate a single field
   * @param {string} name - Field name
   * @param {string} value - Field value
   * @returns {string} Error message or empty string if valid
   */
  const validateField = (name, value) => {
    // Check required fields
    if (!value || value.trim() === '') {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    // Field-specific validation
    switch (name) {
      case 'email':
        if (!VALIDATION_RULES.EMAIL_REGEX.test(value)) {
          return ERROR_MESSAGES.INVALID_EMAIL;
        }
        break;
      case 'postalCode':
        if (!VALIDATION_RULES.POSTAL_CODE_REGEX.test(value)) {
          return ERROR_MESSAGES.INVALID_POSTAL_CODE;
        }
        break;
      default:
        break;
    }

    return '';
  };

  /**
   * Handle input change - update form data and validate on blur
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error if field was touched and now has value
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /**
   * Handle blur - mark field as touched and validate
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  /**
   * Validate all fields
   * @returns {boolean} True if all fields are valid
   */
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(name => {
      const error = validateField(name, formData[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  /**
   * Render form field with label and error message
   */
  const renderField = (name, label, type = 'text', placeholder = '') => {
    const hasError = errors[name];
    const isTouched = touched[name];

    return (
      <div key={name} className="mb-md">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-xs"
        >
          {label}
          <span className="text-red-500 ml-xs" aria-label="required">
            *
          </span>
        </label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`w-full px-md py-sm border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            hasError && isTouched
              ? 'border-red-500 focus:ring-red-500 bg-red-50'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
        {hasError && isTouched && (
          <p
            id={`${name}-error`}
            className="mt-xs text-sm text-red-600"
            role="alert"
          >
            {hasError}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-md">
      <fieldset>
        <legend className="text-lg font-semibold text-gray-900 mb-md">
          Shipping Information
        </legend>

        {renderField('fullName', 'Full Name', 'text', 'John Doe')}
        {renderField('email', 'Email Address', 'email', 'john@example.com')}
        {renderField('address', 'Street Address', 'text', '123 Main St')}
        {renderField('city', 'City', 'text', 'New York')}
        {renderField('postalCode', 'Postal Code', 'text', '10001')}
      </fieldset>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-md px-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Continue to Payment
      </button>
    </form>
  );
}
