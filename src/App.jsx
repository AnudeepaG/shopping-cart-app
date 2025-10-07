import React, { useState, useEffect, useRef, useContext } from 'react';
import { ShoppingCart, Package, Search, User, Truck, Shield, RotateCcw, Zap, Heart } from 'lucide-react';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import CartManager from './services/CartManager';
import ProductService from './services/ProductService';
import APIService from './services/APIService';
import { Link, useNavigate } from 'react-router-dom';
import WishlistProvider, { WishlistContext } from './contexts/WishlistContext';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const navigate = useNavigate();
  const { user, addOrder } = useContext(AuthContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // Removed duplicate wishlist state, using context only
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  const cartManager = useRef(new CartManager()).current;

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchQuery, selectedCategory, sortBy]);

  const loadProducts = async () => {
    setLoading(true);
    const response = await APIService.fetchProducts();
    if (response.success) {
      setProducts(response.data);
      setFilteredProducts(response.data);
    }
    setLoading(false);
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.getDiscount() - a.getDiscount());
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    cartManager.addItem(product);
    setCart([...cartManager.items]);
    console.log('Cart updated:', cartManager.items.length, 'items');
  };

  // Use context-based wishlist
  const toggleWishlist = (product) => {
    if (wishlist.find(p => p.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleRemoveFromCart = (productId) => {
    cartManager.removeItem(productId);
    setCart([...cartManager.items]);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    cartManager.updateQuantity(productId, quantity);
    setCart([...cartManager.items]);
  };

  const applyCoupon = (code) => {
    const coupons = {
      'SAVE10': { discount: 10, type: 'percentage' },
      'FLAT500': { discount: 500, type: 'fixed' },
      'WELCOME20': { discount: 20, type: 'percentage' }
    };

    if (coupons[code]) {
      setAppliedCoupon({ code, ...coupons[code] });
      return true;
    }
    return false;
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = cartManager.getTotal();
    if (appliedCoupon.type === 'percentage') {
      return Math.floor((subtotal * appliedCoupon.discount) / 100);
    }
    return appliedCoupon.discount;
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setCheckoutLoading(true);
    const discount = calculateDiscount();
    const response = await APIService.checkout(cart, discount);
    setCheckoutLoading(false);
    
    if (response.success) {
      setOrderSuccess({
        orderId: response.orderId,
        delivery: response.estimatedDelivery
      });
      // Save order to user context for My Orders page
      addOrder({
        id: response.orderId,
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        subtotal,
        discount,
        deliveryCharge,
        totalAmount: total,
        timestamp: new Date().toISOString(),
        status: 'confirmed',
        estimatedDelivery: response.estimatedDelivery
      });
      cartManager.clear();
      setCart([]);
      setAppliedCoupon(null);
    }
  };

  const subtotal = cartManager.getTotal();
  const discount = calculateDiscount();
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + deliveryCharge;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 text-center text-sm font-medium">
        🎉 Grand Sale! Use code <span className="font-bold">SAVE10</span> for 10% OFF | Free delivery on orders above ₹500
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MiniMart
                </h1>
                <p className="text-xs text-gray-500">Mini Cart, Maximum Convenience</p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/wishlist" className="hidden md:flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg font-semibold hover:bg-pink-100 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Wishlist</span>
              </Link>
              <Link to="/account" className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-purple-50 rounded-lg transition-colors">
                <User className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Account</span>
              </Link>
              <Link to="/orders" className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-purple-50 rounded-lg transition-colors">
                <Package className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Orders</span>
              </Link>
              {!user ? (
                <>
                  <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    <User className="w-5 h-5" />
                    <span className="text-sm">Login</span>
                  </Link>
                  <Link to="/register" className="hidden md:flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                    <User className="w-5 h-5" />
                    <span className="text-sm">Register</span>
                  </Link>
                  <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-200 text-purple-600 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                    <User className="w-5 h-5" />
                    <span className="text-sm">Guest Login</span>
                  </Link>
                </>
              ) : null}
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-purple-600" />
                {cartManager.getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartManager.getItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b sticky top-[120px] md:top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {ProductService.getCategories().map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-purple-600">{filteredProducts.length}</span> products
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 font-medium text-gray-700"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Discount</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading amazing products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Package className="w-20 h-20 text-gray-300 mb-4" />
            <p className="text-xl font-semibold text-gray-700 mb-2">No products found</p>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              const cartItem = cartManager.items.find(item => item.product.id === product.id);
              const cartQuantity = cartItem ? cartItem.quantity : 0;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isWishlisted={wishlist.find(p => p.id === product.id)}
                  onToggleWishlist={() => toggleWishlist(product)}
                  cartQuantity={cartQuantity}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Truck className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">Free Delivery</h4>
            <p className="text-sm text-gray-500">On orders above ₹500</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Shield className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">Secure Payment</h4>
            <p className="text-sm text-gray-500">100% secure transactions</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <RotateCcw className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">Easy Returns</h4>
            <p className="text-sm text-gray-500">7 days return policy</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Zap className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">Quick Delivery</h4>
            <p className="text-sm text-gray-500">Fast shipping nationwide</p>
          </div>
        </div>
      </main>

      {showCart && (
        <CartModal
          cart={cart}
          subtotal={subtotal}
          discount={discount}
          deliveryCharge={deliveryCharge}
          total={total}
          appliedCoupon={appliedCoupon}
          onClose={() => setShowCart(false)}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
          onApplyCoupon={applyCoupon}
          onRemoveCoupon={() => setAppliedCoupon(null)}
          checkoutLoading={checkoutLoading}
          orderSuccess={orderSuccess}
        />
      )}
    </div>
  );
}

export default App;
