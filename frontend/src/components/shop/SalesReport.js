import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SalesReport = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/shop/orders", {
        withCredentials: true,
      });
      // Filter only completed/delivered orders
      const completedOrders = data.orders.filter(
        (order) => order.orderStatus === "Delivered"
      );
      setOrders(completedOrders);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  return (
    <div className="container">
      <h3 className="mb-4"> Sales Report</h3>

      {loading ? (
        <p>Loading sales data...</p>
      ) : orders.length === 0 ? (
        <p>No completed sales found.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const date = new Date(order.createdAt).toLocaleDateString();
                const itemCount = order.orderItems.reduce(
                  (count, item) => count + item.quantity,
                  0
                );

                return (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td>{date}</td>
                    <td>{itemCount}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4">
            <h5>Total Revenue: ${totalRevenue.toFixed(2)}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesReport;
