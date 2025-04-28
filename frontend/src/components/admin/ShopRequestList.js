import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ShopRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchShopRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/admin/requests", {
        withCredentials: true,
      });
  
      setRequests(data.shops || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch requests");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.put(
        `/api/v1//admin/approve/${id}`,
        { status: action },
        { withCredentials: true }
      );
      toast.success(`Request ${action}ed successfully`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${action} request`);
    }
  };
  const handleReject = async (id, action) => {
    if (window.confirm("Are you sure you want to reject (delete) this shop request?")) {
      try {
        await axios.delete(`/api/v1/admin/shop/${id}`, { withCredentials: true });
        toast.success("Request rejected and deleted successfully");
        setRequests((prev) => prev.filter((r) => r._id !== id));
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to reject request");
      }
    }
  };

  useEffect(() => {
    fetchShopRequests();
  }, []);

  return (
    <div className="container">
      <h3 className="mb-4">Shop Registration Requests</h3>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Shop Name</th>
              <th>Owner Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Requested At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req.shopName}</td>
                <td>{req.ownerName}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction(req._id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(req._id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShopRequestList;
