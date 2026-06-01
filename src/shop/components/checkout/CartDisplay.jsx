import { calculateItemSubtotal, formatCurrency } from './calculations.js';
import QuantityEditor from './QuantityEditor';

/**
 * CartDisplay Component
 * 
 * Displays all items in the shopping cart with product details,
 * quantities, unit prices, and calculated subtotals.
 * Shows an empty cart message when no items are present.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<CartItem>} props.cartItems - Array of items in the cart
 * @param {Function} props.onQuantityChange - Callback when quantity is changed (itemId, newQuantity)
 * @param {Function} props.onRemoveItem - Callback when item is removed (itemId)
 * @returns {React.ReactElement} The rendered cart display
 */
export default function CartDisplay({ cartItems = [], onQuantityChange, onRemoveItem }) {
  // Show empty cart message if no items
  if (cartItems.length === 0) {
    return (
      <div className="bg-transparent p-6 md:p-8">
        <div className="text-center py-12">
          <p className="text-lg text-white/60">Your cart is empty</p>
          <p className="text-sm text-white/40 mt-2">Add items to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent overflow-hidden">
      {/* Cart header */}
      <div className="border-b border-white/10 px-6 py-4 md:px-8 md:py-5">
        <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
      </div>

      {/* Cart items list */}
      <div className="divide-y divide-white/10">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * CartItem Component
 * 
 * Renders a single cart item with image, name, price, quantity, and subtotal.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {CartItem} props.item - The cart item to display
 * @param {Function} props.onQuantityChange - Callback when quantity changes
 * @param {Function} props.onRemoveItem - Callback when item is removed
 * @returns {React.ReactElement} The rendered cart item
 */
function CartItem({ item, onQuantityChange, onRemoveItem }) {
  const subtotal = calculateItemSubtotal(item.unitPrice, item.quantity);

  return (
    <div className="px-6 py-4 md:px-8 md:py-6 flex gap-4 md:gap-6">
      {/* Product image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md bg-white/10"
        />
      </div>

      {/* Product details */}
      <div className="flex-grow min-w-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4">
          {/* Name and price */}
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-medium text-white truncate">
              {item.name}
            </h3>
            <p className="text-sm md:text-base text-white/60 mt-1">
              {formatCurrency(item.unitPrice)} each
            </p>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-base md:text-lg font-semibold text-white">
              {formatCurrency(subtotal)}
            </p>
            <p className="text-xs md:text-sm text-white/40 mt-1">
              Qty: {item.quantity}
            </p>
          </div>
        </div>

        {/* Quantity and remove controls */}
        <div className="flex items-center gap-3 mt-4 md:mt-3">
          <QuantityEditor
            itemId={item.id}
            currentQuantity={item.quantity}
            itemName={item.name}
            onIncrement={(id, newQuantity) => onQuantityChange?.(id, newQuantity)}
            onDecrement={(id, newQuantity) => onQuantityChange?.(id, newQuantity)}
            onRemove={onRemoveItem}
          />

          <button
            onClick={() => onRemoveItem?.(item.id)}
            className="ml-auto px-4 py-2 text-sm text-accent hover:bg-accent/10 rounded-md transition-colors"
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
