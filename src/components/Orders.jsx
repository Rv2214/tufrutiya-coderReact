import React from "react";

function Orders({ orders, prevPage, nextPage }) {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <h1>Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="card card__detail">
          <div className="card-body">
            <h5 className="card-title">Order Information</h5>
            <p>Order ID: {order._id}</p>
            <p>State: {order.state}</p>
            <p>Created At: {order.createdAt}</p>
            <p>Updated At: {order.updatedAt}</p>
            <p>Product ID: {order.product_id}</p>
            <p>Quantity: {order.quantity}</p>
          </div>
          <div className="card-body">
            <h5 className="card-title">User Information</h5>
            <p>User ID: {order.user_id}</p>
            <p>Email: {order.email}</p>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-between mt-4">
        <button onClick={prevPage} className="btn btn-primary">
          Previous Page
        </button>
        <button onClick={nextPage} className="btn btn-primary">
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Orders;
