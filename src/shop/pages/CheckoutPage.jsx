import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCollection } from "../context/CollectionContext";
import { PAYMENT_METHODS } from "../components/checkout/constants.js";
import { calculateDiscountAmount, roundToTwoDecimals } from "../components/checkout/calculations.js";
import CartDisplay from "../components/checkout/CartDisplay.jsx";
import ShippingForm from "../components/checkout/ShippingForm.jsx";
import PaymentMethodSelector from "../components/checkout/PaymentMethodSelector.jsx";
import CreditCardForm from "../components/checkout/CreditCardForm.jsx";
import QRPromptPayDisplay from "../components/checkout/QRPromptPayDisplay.jsx";
import DiscountCodeInput from "../components/checkout/DiscountCodeInput.jsx";
import OrderSummary from "../components/checkout/OrderSummary.jsx";
import OrderSubmissionProcessor from "../components/checkout/OrderSubmissionProcessor.jsx";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { addToCollection } = useCollection();
  const navigate = useNavigate();

  // แปลง cart items จาก CartContext format → checkout format
  const [cartItems, setCartItems] = useState(() =>
    items.map((item) => ({
      id: item.key,
      productId: item.product_id,
      name: item.title_snapshot,
      image: item.cover_url || `https://via.placeholder.com/200x200/1a1a1a/ffffff?text=${encodeURIComponent(item.title_snapshot)}`,
      unitPrice: item.unit_price,
      quantity: item.quantity,
      type: item.type === "merch" ? "merchandise" : "digital",
    }))
  );

  const [shippingInfo, setShippingInfo] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(PAYMENT_METHODS.CREDIT_CARD);
  const [creditCardDetails, setCreditCardDetails] = useState(null);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState("");
  const [discountType, setDiscountType] = useState(null);
  const [discountValue, setDiscountValue] = useState(0);

  const cartSubtotal = roundToTwoDecimals(
    cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  );
  const discountAmount = discountType
    ? roundToTwoDecimals(calculateDiscountAmount(cartSubtotal, discountType, discountValue))
    : 0;

  const handleQuantityChange = useCallback((itemId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) => item.id === itemId ? { ...item, quantity: newQuantity } : item)
    );
  }, []);

  const handleRemoveItem = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const handleShippingSubmit = useCallback((data) => {
    setShippingInfo(data);
  }, []);

  const handleDiscountApply = useCallback((code, type, value) => {
    setAppliedDiscountCode(code);
    setDiscountType(type);
    setDiscountValue(value);
  }, []);

  const handleDiscountRemove = useCallback(() => {
    setAppliedDiscountCode("");
    setDiscountType(null);
    setDiscountValue(0);
  }, []);

  const handleOrderSuccess = useCallback((submittedOrder) => {
    if (submittedOrder?.items) {
      addToCollection(submittedOrder.items.map((i) => i.productId));
    }
    clearCart();
    navigate("/shop");
  }, [clearCart, navigate, addToCollection]);

  const paymentDetails =
    selectedPaymentMethod === PAYMENT_METHODS.CREDIT_CARD
      ? creditCardDetails
      : { method: PAYMENT_METHODS.QR_PROMPTPAY };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 md:py-8 md:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Cart + Shipping + Payment */}
          <div className="lg:col-span-2 space-y-6">
            <section aria-label="Shopping cart">
              <CartDisplay
                cartItems={cartItems}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
              />
            </section>

            <section className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <ShippingForm onSubmit={handleShippingSubmit} />
            </section>

            <section className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment</h2>
              <PaymentMethodSelector
                selectedMethod={selectedPaymentMethod}
                onMethodSelect={setSelectedPaymentMethod}
              />
              <CreditCardForm
                isVisible={selectedPaymentMethod === PAYMENT_METHODS.CREDIT_CARD}
                onPaymentDetailsChange={setCreditCardDetails}
              />
              <QRPromptPayDisplay
                isVisible={selectedPaymentMethod === PAYMENT_METHODS.QR_PROMPTPAY}
              />
            </section>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-8">
              <section className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Discount</h2>
                <DiscountCodeInput
                  onApply={handleDiscountApply}
                  onRemove={handleDiscountRemove}
                  discountAmount={discountAmount}
                  appliedCode={appliedDiscountCode}
                />
              </section>

              <section>
                <OrderSummary
                  cartItems={cartItems}
                  discountAmount={discountAmount}
                  selectedPaymentMethod={selectedPaymentMethod}
                />
              </section>

              <section>
                <OrderSubmissionProcessor
                  cartItems={cartItems}
                  shippingInformation={shippingInfo}
                  paymentDetails={paymentDetails}
                  discountCode={appliedDiscountCode}
                  discountAmount={discountAmount}
                  onSubmitSuccess={handleOrderSuccess}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
