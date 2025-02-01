import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                3D Print Shop
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            <Link
              to="/cart"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              to="/admin"
              className="hidden sm:block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}