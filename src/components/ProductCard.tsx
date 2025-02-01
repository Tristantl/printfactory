import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {product.price.toFixed(2)}€
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
}