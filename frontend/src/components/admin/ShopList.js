import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchApprovedShops = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/admin/shoplist", {
        withCredentials: true,
      });
  
      if (data && Array.isArray(data.shops)) {
        setShops(data.shops);
        setFilteredShops(data.shops);
      } else {
        setShops([]);
        setFilteredShops([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch shops");
      setShops([]);
      setFilteredShops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
      try {
        await axios.delete(`/api/v1/admin/shop/${id}`, {
          withCredentials: true,
        });
        toast.success("Shop deleted successfully");
        fetchApprovedShops();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete shop");
      }
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = shops.filter((shop) =>
      shop.shopName.toLowerCase().includes(value) ||
      shop.ownerName.toLowerCase().includes(value) ||
      shop.email.toLowerCase().includes(value)
    );
    setFilteredShops(filtered);
  };

  useEffect(() => {
    fetchApprovedShops();
  }, []);

  return (
    <div className="container">
      <h3 className="mb-3">Approved Shops</h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by shop name, owner or email..."
        value={searchQuery}
        onChange={handleSearch}
      />

      {loading ? (
        <p>Loading shops...</p>
      ) : filteredShops.length === 0 ? (
        <p>No shops found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Shop Name</th>
              <th>Owner Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Products</th>
              <th>Orders</th>
              <th>Registered At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.map((shop, index) => (
              <tr key={shop._id}>
                <td>{index + 1}</td>
                <td>{shop.shopName}</td>
                <td>{shop.ownerName}</td>
                <td>{shop.email}</td>
                <td>{shop.phone}</td>
                <td>{shop.totalProducts || 0}</td>
                <td>{shop.totalOrders || 0}</td>
                <td>{new Date(shop.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/admin/shop/${shop._id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/shop/edit/${shop._id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(shop._id)}
                  >
                    Delete
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

export default ShopList;
