import React, { useState } from "react";

const ProductCounter = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(quantity);
    alert(`Has agregado ${quantity} unidades de ${product.title} al carrito.`);
  };

  return (
    <div className="product-counter">
      <button onClick={decrement}>-</button>
      <span>{quantity}</span>
      <button onClick={increment}>+</button>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default ProductCounter;
