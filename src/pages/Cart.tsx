import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const order = {
      firstName,
      lastName,
      items,
      totalPrice,
      date: new Date().toISOString(),
    };

    // In a real app, you would send this to your backend
    console.log('Order submitted:', order);
    
    // Clear the form and cart
    setFirstName('');
    setLastName('');
    clearCart();
    alert('Commande envoyée avec succès !');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
        Panier
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Votre panier est vide</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.price.toFixed(2)}€
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Finaliser la commande
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
                />
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Commander
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}