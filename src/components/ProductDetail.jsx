import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCounter from "./ProductCounter";
import { CartContext } from "./CartContext";

const apiUrl = import.meta.env.VITE_API_URL;

function ProductDetail({ products }) {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = async (quantity) => {
    const numericQuantity = Number(quantity);

    if (isNaN(numericQuantity) || numericQuantity <= 0) {
      alert("Quantity must be a valid number greater than zero.");
      return;
    }
    addToCart(product, numericQuantity);

    try {
      const response = await fetch(`${apiUrl}/api/orders/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ quantity: numericQuantity }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product added to cart successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Error adding product to cart:", errorData.message);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(
        "There was a problem adding the product to the cart.",
        error
      );
      alert("Hubo un problema al añadir el producto al carrito.");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card card__detail">
        <h2>{product.title}</h2>
        <img src={product.photo} alt={product.title} className="card-img-top" />
        <div className="card-body d-flex">
          <p>{product.description}</p>
          <p className="p-2 fs-6">Precio: ${product.price}</p>
          <ProductCounter product={product} addToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
