import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";



const ShopOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false); 

  const fetchShopOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/shop/orders", {
        withCredentials: true,
      });
      setOrders(data.orders || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (Id, newStatus) => {
    try {
      setUpdating(true);
      await axios.put(
        `/api/v1/shop/orders/${Id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(`Order marked as ${newStatus}`);
      fetchShopOrders(); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchShopOrders();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-4">Shop Orders</h3>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">🆔 Order ID: {order._id}</h5>

              
              <div className="mb-2">
                <strong>Phone:</strong> {order.shippingInfo?.phoneNo || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Address:</strong> {order.shippingInfo?.address || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Status:</strong>{" "}
                <span className={`badge ${order.orderStatus === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                  {order.orderStatus}
                </span>
              </div>
              <div className="mb-2">
                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
              </div>
              <div className="mb-3">
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </div>

              <h6 className="mt-4 mb-2">🛒 Items:</h6>
              <ul className="list-group">
                {order.orderItems.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        className="rounded me-3"
                      />
                      <span>{item.name} (x{item.quantity})</span>
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </li>
                ))}
              </ul>

              <div className="text-end mt-3">
                <strong>Total Items:</strong>{" "}
                {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)}
              </div>

              {/* Status Update Buttons */}
              {order.orderStatus === "Processing" && (
                <div className="text-end mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => updateOrderStatus(order._id, "Shipped")}
                    disabled={updating}
                  >
                    {updating ? "Updating..." : "Mark as Shipped"}
                  </button>
                </div>
              )}
              {order.orderStatus === "Shipped" && (
                <div className="text-end mt-3">
                  <button
                    className="btn btn-success"
                    onClick={() => updateOrderStatus(order._id, "Delivered")}
                    disabled={updating}
                  >
                    {updating ? "Updating..." : "Mark as Delivered"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShopOrders;
