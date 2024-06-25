import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./CartContext";

function CartWidget() {
  const { getTotalQuantity } = useCart();

  return (
    <div className="div__cartwidget">
      <span style={{ marginRight: "10px" }}> Cart</span>
      <FontAwesomeIcon icon={faShoppingCart} />
      <span
        className="badge"
        style={{ backgroundColor: "orange", color: "black" }}
      >
        ({getTotalQuantity()})
      </span>
    </div>
  );
}

export default CartWidget;
