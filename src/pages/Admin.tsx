import React, { useState } from 'react';
import { Order } from '../types';

const ADMIN_PASSWORD = 'tritri99';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // In a real app, these would be fetched from your backend
  const orders: Order[] = [];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Connexion Admin
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
        Commandes
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Aucune commande pour le moment
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {order.firstName} {order.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {order.totalPrice.toFixed(2)}€
                </span>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {(item.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}