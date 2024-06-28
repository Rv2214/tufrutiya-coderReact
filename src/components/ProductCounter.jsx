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
    <div className="product-counter d-flex">
      <button
        className="btn btn-warning d-block mx-auto mb-2"
        onClick={decrement}
      >
        -
      </button>
      <span className="p-2 fs-6 fw-normal">{quantity}</span>
      <button
        className="btn btn-warning d-block mx-auto mb-2"
        onClick={increment}
      >
        +
      </button>
      <button
        className="btn btn-warning d-block mx-auto mb-2"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCounter;
