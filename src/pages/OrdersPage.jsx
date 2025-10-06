import React, { useContext, useState } from 'react';
import '../shopping-bg.css';
import { AuthContext } from '../contexts/AuthContext';
import { Package, XCircle, CheckCircle, CreditCard } from 'lucide-react';

function OrdersPage() {
  const { user, cancelOrder } = useContext(AuthContext);
  const [cancelledOrderId, setCancelledOrderId] = useState(null);

  return (
    <div className="min-h-screen bg-shopping-theme py-10 relative overflow-hidden">
      {/* More shopping themed icons in background for playful look */}
      <svg className="bg-icon icon-cart" viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-13z" stroke="#a78bfa" strokeWidth="2"/><circle cx="9" cy="20" r="2" fill="#f472b6"/><circle cx="18" cy="20" r="2" fill="#f472b6"/></svg>
      <svg className="bg-icon icon-bag" viewBox="0 0 24 24" fill="none"><path d="M6 7V6a6 6 0 1112 0v1" stroke="#f472b6" strokeWidth="2"/><rect x="3" y="7" width="18" height="14" rx="2" stroke="#a78bfa" strokeWidth="2"/></svg>
      <svg className="bg-icon icon-gift" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="15" rx="2" stroke="#a78bfa" strokeWidth="2"/><path d="M12 7V2" stroke="#f472b6" strokeWidth="2"/><circle cx="7" cy="5" r="3" stroke="#a78bfa" strokeWidth="2"/><circle cx="17" cy="5" r="3" stroke="#a78bfa" strokeWidth="2"/></svg>
      <svg className="bg-icon icon-star" viewBox="0 0 24 24" fill="none"><polygon points="12,2 15,8.5 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 9,8.5" stroke="#fbbf24" strokeWidth="2"/></svg>
      <svg className="bg-icon icon-heart" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 4.1 13.44 5.68C13.97 4.1 15.64 3 17.5 3C20.58 3 23 5.42 23 8.5C23 13.5 15 21 12 21Z" stroke="#f472b6" strokeWidth="2"/></svg>
      <svg className="bg-icon icon-user" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#a78bfa" strokeWidth="2"/><path d="M2 20c0-4 8-6 10-6s10 2 10 6" stroke="#a78bfa" strokeWidth="2"/></svg>
      {/* Extra icons for more visual interest */}
      <svg className="bg-icon icon-credit" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" stroke="#38bdf8" strokeWidth="2"/><rect x="4" y="10" width="6" height="2" fill="#a78bfa"/></svg>
      <svg className="bg-icon icon-truck" viewBox="0 0 24 24" fill="none"><rect x="1" y="7" width="15" height="10" rx="2" stroke="#fbbf24" strokeWidth="2"/><rect x="16" y="10" width="5" height="7" rx="2" stroke="#f472b6" strokeWidth="2"/><circle cx="6" cy="19" r="2" fill="#38bdf8"/><circle cx="18" cy="19" r="2" fill="#38bdf8"/></svg>
      <svg className="bg-icon icon-percent" viewBox="0 0 24 24" fill="none"><circle cx="7" cy="17" r="2" stroke="#a78bfa" strokeWidth="2"/><circle cx="17" cy="7" r="2" stroke="#f472b6" strokeWidth="2"/><line x1="6" y1="18" x2="18" y2="6" stroke="#fbbf24" strokeWidth="2"/></svg>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">My Orders</h2>
        {!user || !user.orders || user.orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl shadow">No orders found.</div>
        ) : (
          <div className="space-y-8">
            {user.orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="font-bold text-purple-600 text-lg flex items-center gap-2">
                    <Package className="w-6 h-6" /> Order ID: {order.id}
                  </div>
                  <div className="text-gray-700">Date: {new Date(order.timestamp).toLocaleString()}</div>
                </div>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'}`}>
                    {order.status === 'cancelled' ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5 text-green-600" />} Status: <span>{order.status}</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 rounded-lg text-green-700 font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> Delivery: <span>{order.estimatedDelivery}</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 rounded-lg text-blue-700 font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> Total: <span className="font-bold">₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="font-semibold mb-2">Items:</div>
                <ul className="list-disc pl-6 text-gray-700">
                  {order.items.map(item => (
                    <li key={item.productId}>
                      <span className="font-medium">{item.name}</span> x {item.quantity} <span className="text-xs text-gray-500">(₹{item.price.toLocaleString()} each)</span>
                    </li>
                  ))}
                </ul>
                {order.status !== 'cancelled' && (
                  <button
                    onClick={() => { cancelOrder(order.id); setCancelledOrderId(order.id); }}
                    className="mt-6 w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                  >
                    Cancel Order
                  </button>
                )}
                {order.status === 'cancelled' && order.refundMessage && (
                  <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg text-center font-semibold">
                    {order.refundMessage}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
