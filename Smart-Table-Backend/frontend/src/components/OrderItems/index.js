import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3002/orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleMarkDelivered = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, delivered: true } : order
      )
    );
  };

  const deliveredOrders = orders.filter(order => order.delivered);
  const unmarkedOrders = orders.filter(order => !order.delivered);

  return (
    <div className="order-list-container">
      <h1 className="title">Customer Orders</h1>

      {unmarkedOrders.length === 0 ? (
        <p className="no-orders">No pending orders</p>
      ) : (
        <div className="orders-section">
          <h2>Pending Orders</h2>
          {unmarkedOrders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-number">
                <h3>Order #{order._id}</h3>
              </div>
              <div className="customer-details">
                <h3>Customer: {order.customerDetails.name}</h3>
                <p>Phone: {order.customerDetails.phone}</p>
                <p>Message: {order.customerDetails.msg}</p>
              </div>
              <div className="order-items">
                <h4>Ordered Items</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price (₹)</th>
                      <th>Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                className="mark-delivered-btn"
                onClick={() => handleMarkDelivered(order._id)}
              >
                Mark as Delivered
              </button>
            </div>
          ))}
        </div>
      )}

      {deliveredOrders.length > 0 && (
        <div className="delivered-orders-section">
          <h2>Delivered Orders</h2>
          {deliveredOrders.map((order) => (
            <div key={order._id} className="order-card delivered">
              <div className="order-number">
                <h3>Order #{order._id}</h3>
              </div>
              <div className="customer-details">
                <h3>Customer: {order.customerDetails.name}</h3>
                <p>Phone: {order.customerDetails.phone}</p>
                <p>Message: {order.customerDetails.msg}</p>
              </div>
              <div className="order-items">
                <h4>Ordered Items</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price (₹)</th>
                      <th>Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mark-delivered-btn disabled" disabled>
                Marked as Delivered
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
