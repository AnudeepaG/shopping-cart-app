import React, { createContext, useState } from 'react';

export const AuthContext = createContext();


const DEMO_USER = {
  email: 'guest@demo.com',
  phone: '9999999999',
  address: 'Demo Street, Interview City',
  orders: [],
};

// Persist registered users in localStorage
function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem('registeredUsers')) || [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem('registeredUsers', JSON.stringify(users));
}

let registeredUsers = getRegisteredUsers();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  const login = async (email, password) => {
    // Only allow login for registered users
    registeredUsers = getRegisteredUsers();
    const found = registeredUsers.find(u => u.email === email && u.password === password);
    if (found) {
      setUser({ email: found.email, phone: found.phone, address: found.address, orders: found.orders || [] });
      return true;
    }
    return false;
  };

  const guestLogin = async () => {
    setUser({ ...DEMO_USER });
  };


  const register = async (email, password, phone, address) => {
    if (email && password && phone && address) {
      registeredUsers = getRegisteredUsers();
      // Prevent duplicate registration
      if (registeredUsers.some(u => u.email === email)) return false;
      const newUser = { email, password, phone, address, orders: [] };
      registeredUsers.push(newUser);
      saveRegisteredUsers(registeredUsers);
      setUser({ email, phone, address, orders: [] });
      return true;
    }
    return false;
  };

  const updateAccount = (phone, address) => {
    setUser(prev => ({ ...prev, phone, address }));
  };


  const addOrder = (order) => {
    setUser(prev => {
      if (prev && prev.email && prev.email !== DEMO_USER.email) {
        registeredUsers = getRegisteredUsers();
        const idx = registeredUsers.findIndex(u => u.email === prev.email);
        if (idx !== -1) {
          registeredUsers[idx].orders = [...(registeredUsers[idx].orders || []), order];
          saveRegisteredUsers(registeredUsers);
        }
      }
      return { ...prev, orders: [...(prev.orders || []), order] };
    });
  };


  const cancelOrder = (orderId) => {
    setUser(prev => {
      if (prev && prev.email && prev.email !== DEMO_USER.email) {
        registeredUsers = getRegisteredUsers();
        const idx = registeredUsers.findIndex(u => u.email === prev.email);
        if (idx !== -1) {
          registeredUsers[idx].orders = registeredUsers[idx].orders.map(order =>
            order.id === orderId
              ? { ...order, status: 'cancelled', refundMessage: 'Order cancelled. Refund will be processed within 3-5 business days.' }
              : order
          );
          saveRegisteredUsers(registeredUsers);
        }
      }
      return {
        ...prev,
        orders: prev.orders.map(order =>
          order.id === orderId
            ? { ...order, status: 'cancelled', refundMessage: 'Order cancelled. Refund will be processed within 3-5 business days.' }
            : order
        )
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, guestLogin, register, updateAccount, addOrder, cancelOrder }}>
      {children}
    </AuthContext.Provider>
  );
}
