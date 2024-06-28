import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const apiUrl = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${apiUrl}/api/orders`, {
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
      const response = await fetch(`${apiUrl}/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

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
      const response = await fetch(`${apiUrl}/api/payments/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

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
    <div className="d-flex flex-column">
      <div className="container d-flex align-items-stretch mt-5">
        <ul>
          {cartItems.map((item) => (
            <div key={item._id} className="card">
              <li>
                <div>
                  <img
                    src={item.product_id.photo}
                    alt={item.product_id.title}
                    className="card-img-top"
                  />
                  -{" "}
                  <li>
                    {item.product_id.title} - {item.quantity} x $
                    {item.product_id.price}
                  </li>
                  <button
                    className="btn btn-warning d-block mx-auto mb-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <p>Total: ${total}</p>
      <p>Total Quantity: {getTotalQuantity()}</p>
      <button
        className="btn btn-warning mb-2 btn__checkout"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
