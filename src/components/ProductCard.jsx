import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Heart, Star } from 'lucide-react';

function ProductCard({ 
  product, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist, 
  cartQuantity, 
  onUpdateQuantity, 
  onRemoveFromCart 
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);

  const handleAdd = () => {
    if (product.isInStock()) onAddToCart(product);
  };

  const handleIncrement = () => {
    if (cartQuantity < product.stock) onUpdateQuantity(product.id, cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      onUpdateQuantity(product.id, cartQuantity - 1);
    } else {
      onRemoveFromCart(product.id);
    }
  };

  const toggleWishlist = () => {
    setHeartClicked(true);
    onToggleWishlist(product.id);
    setTimeout(() => setHeartClicked(false), 300);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-200 border-t-purple-600"></div>
          </div>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Discount and tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.getDiscount() > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
              {product.getDiscount()}% OFF
            </span>
          )}
          {product.tags.map(tag => (
            <span key={tag} className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg">
              {tag}
            </span>
          ))}
        </div>

        {/* ...existing code... */}

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
      </div>

      {/* Product details */}
      <div className="p-4">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        {/* Wishlist button below product name */}
        <button
          onClick={toggleWishlist}
          className={`mb-2 p-2 bg-white rounded-full shadow hover:scale-110 hover:shadow-lg active:scale-95 transition-all border border-gray-200 ${heartClicked ? 'animate-ping' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
            <Star className="w-3 h-3 fill-current" />
            {product.rating}
          </div>
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900">{product.getFormattedPrice()}</span>
          {product.getDiscount() > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">{product.getOriginalPrice()}</span>
              <span className="text-xs font-semibold text-green-600">
                Save ₹{(product.originalPrice - product.price).toLocaleString()}
              </span>
            </>
          )}
        </div>

        {/* Stock status */}
        <p className={`text-xs font-medium mb-3 ${
          product.stock === 0 ? 'text-red-600' : product.stock < 5 ? 'text-orange-600' : 'text-green-600'
        }`}>
          {product.getStockStatus()}
        </p>

        {/* Cart actions */}
        {cartQuantity > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3 bg-white border-2 border-purple-600 rounded-lg p-2">
              <button onClick={handleDecrement} className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all">
                <Minus className="w-4 h-4 text-gray-700" />
              </button>
              <span className="min-w-[40px] text-center font-bold text-gray-900 text-lg">{cartQuantity}</span>
              <button onClick={handleIncrement} disabled={cartQuantity >= product.stock} className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-medium">
              <ShoppingCart className="w-4 h-4" />
              <span>Added to cart</span>
            </div>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            disabled={!product.isInStock()}
            className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              product.isInStock()
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-[1.03] active:scale-95'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.isInStock() ? 'Add to Cart' : 'Out of Stock'}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
