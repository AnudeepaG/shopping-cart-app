import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

function CartItemComponent({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex gap-4 mb-4 pb-4 border-b last:border-b-0 bg-white rounded-lg p-3 shadow-sm">
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-xs text-purple-600 font-semibold mb-1">{item.product.brand}</p>
            <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm">{item.product.name}</h4>
          </div>
          <button
            onClick={() => onRemove(item.product.id)}
            className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">{item.product.getFormattedPrice()}</span>
          {item.product.getDiscount() > 0 && (
            <span className="text-xs text-gray-400 line-through">{item.product.getOriginalPrice()}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              className="p-1 hover:bg-white rounded transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="px-3 py-1 font-semibold text-gray-900">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="p-1 hover:bg-white rounded transition-colors"
              disabled={item.quantity >= item.product.stock}
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <span className="font-bold text-purple-600">₹{item.getSubtotal().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default CartItemComponent;