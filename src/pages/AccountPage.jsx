import React, { useContext, useState } from 'react';
import '../shopping-bg.css';
import { AuthContext } from '../contexts/AuthContext';

function AccountPage() {
  const { user, updateAccount } = useContext(AuthContext);
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    updateAccount(phone, address);
    setMessage('Account updated!');
  };

  return (
    <div className="min-h-screen bg-shopping-theme flex items-center justify-center relative overflow-hidden">
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
  <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 z-10 relative backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-6 text-center">My Account</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" className="w-full px-4 py-2 border rounded" required />
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Shipping Address" className="w-full px-4 py-2 border rounded" required />
          <button type="submit" className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition text-white rounded font-bold">Update</button>
        </form>
        {message && <div className="text-green-600 text-sm mt-4 text-center">{message}</div>}
      </div>
    </div>
  );
}

export default AccountPage;
