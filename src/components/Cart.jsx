import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

function Cart() {
  const {
    cartItems: contextCartItems,
    removeFromCart,
    setCartItems,
    getTotalQuantity,
  } = useContext(CartContext);
  const [cartItems, setLocalCartItems] = useState([]);

  useEffect(() => {
    setLocalCartItems(contextCartItems);
  }, [contextCartItems]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.response.docs || []);
      } else {
        const errorData = await response.json();
        console.error(
          "Error al obtener los artículos del carrito:",
          errorData.message
        );
      }
    } catch (error) {
      console.error("Error al obtener los artículos del carrito:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Producto eliminado del carrito");

        setLocalCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item._id !== orderId)
        );

        removeFromCart(orderId);

        fetchCartItems();
      } else {
        const errorData = await response.json();
        console.error(
          "Error al eliminar el producto del carrito:",
          errorData.message
        );
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/payments/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error("No URL provided for checkout session");
        }
      } else {
        const errorData = await response.json();
        console.error("Error during checkout:", errorData.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product_id.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            <div>
              <img src={item.product_id.photo} alt={item.product_id.title} />-{" "}
              {item.product_id.title} - {item.quantity} x $
              {item.product_id.price}
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <p>Total Quantity: {getTotalQuantity()}</p>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
