import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/shopSlice"; 

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { data } = await axios.post("/api/v1/shoplogin", form, {
        withCredentials: true,
      });
  
      if (!data.shop || data.shop.role !== "shopOwner") {
        toast.error("Access denied: Not a shop owner");
        return;
      }
  
      //  Dispatch Redux action
      dispatch(loginSuccess({ shop: data.shop }));
  
      toast.success("Login successful");
      navigate("/shop/shopdashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "auto", padding: "2rem" }}>
      <h2 className="mb-4">🛒 Shop Owner Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={form.email}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={form.password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login as Shop Owner"}
        </button>

        <Link to="/registershopowner" className="float-right mt-3 text-danger">
                      Create a new Shop
        </Link>
      </form>
    </div>
  );
};

export default ShopLoginPage;
