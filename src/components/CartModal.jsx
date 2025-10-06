import React, { useState } from 'react';
import { X, ShoppingCart, CheckCircle, Truck, Shield, RotateCcw, Tag } from 'lucide-react';
import CartItemComponent from './CartItemComponent';

function CartModal({ 
  cart, subtotal, discount, deliveryCharge, total, appliedCoupon,
  onClose, onRemove, onUpdateQuantity, onCheckout, onApplyCoupon, onRemoveCoupon,
  checkoutLoading, orderSuccess 
}) {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    if (onApplyCoupon(couponCode)) {
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col">
        <div className="p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <p className="text-purple-100 text-sm">{cart.length} items in your cart</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {orderSuccess ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
              <p className="text-gray-600 mb-1">Order ID: <span className="font-semibold text-purple-600">{orderSuccess.orderId}</span></p>
              <p className="text-gray-600 mb-4">Expected delivery: <span className="font-semibold">{orderSuccess.delivery}</span></p>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-500 mb-2">Track your order via email</p>
                <div className="flex items-center justify-center gap-2 text-purple-600">
                  <Truck className="w-5 h-5 animate-pulse" />
                  <span className="font-medium">Your order is being processed</span>
                </div>
              </div>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add some products to get started!</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {cart.map(item => (
                <CartItemComponent
                  key={item.product.id}
                  item={item}
                  onRemove={onRemove}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}

              <div className="mt-6 bg-white rounded-lg p-4 border-2 border-dashed border-purple-300">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Apply Coupon</h4>
                </div>
                
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">{appliedCoupon.code}</span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-sm text-red-600 font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-red-600 text-sm mt-2">{couponError}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Try: SAVE10, FLAT500, WELCOME20
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="border-t bg-white p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    Delivery Charges
                    {deliveryCharge === 0 && (
                      <span className="text-xs text-green-600 font-semibold">(FREE)</span>
                    )}
                  </span>
                  <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : ''}`}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>

                {subtotal < 500 && subtotal > 0 && (
                  <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                    Add items worth ₹{(500 - subtotal).toLocaleString()} more for FREE delivery!
                  </p>
                )}

                <div className="h-px bg-gray-200"></div>

                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                disabled={checkoutLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {checkoutLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <RotateCcw className="w-4 h-4" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;