import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const ShopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/shop/products", {
        withCredentials: true,
      });
      setProducts(data.products);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`/api/v1/shop/product/${id}`, {
        withCredentials: true,
      });
      toast.success("Product deleted successfully");
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3> Your Products</h3>
        <Link to="/shop/shopdashboard/products/new" className="btn btn-success">
          Add Product
        </Link>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.stock}</td>
                  <td>{p.price}</td>
                  <td>
                  <Link to={`/product/${p._id}`} className="btn btn-sm btn-primary me-5">
                     View
                    </Link>
                    <Link to={`/shop/shopdashboard/products/edit/${p._id}`} className="btn btn-sm btn-primary me-5">
                      Edit
                    </Link>
                    <button onClick={() => deleteProduct(p._id)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShopProducts;
