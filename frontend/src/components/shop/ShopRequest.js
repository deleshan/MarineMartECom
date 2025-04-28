import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShopRequest = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    shopName: "",
    shopCategory: "",
    shopDescription: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userForm = new FormData();
      userForm.append("name", formData.ownerName);
      userForm.append("phone", formData.phone);
      userForm.append("address", formData.address);
      userForm.append("email", formData.email);
      userForm.append("password", formData.password);
      userForm.append("shopName", formData.shopName);  
      userForm.append("category", formData.shopCategory);
      userForm.append("description", formData.shopDescription);
      if (avatar) userForm.append("avatar", avatar);

      await axios.post("/api/v1/createshop", userForm, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Shop request submitted successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
      <h2 className="mb-4">Shop Owner Registration</h2>
      <form onSubmit={handleSubmit}>
        <h5>Owner Information</h5>

        <div className="mb-3">
          <label>Owner Name</label>
          <input type="text" name="ownerName" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input type="text" name="phone" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input type="text" name="address" className="form-control" onChange={handleChange} required />
        </div>

        <h5 className="mt-4">Login Information</h5>

        <div className="mb-3">
          <label>Email Address</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="avatar_upload">Avatar</label>
          <div className="d-flex align-items-center">
            <div>
              <figure className="avatar mr-3 item-rtl">
                <img src={avatarPreview} className="rounded-circle me-3" alt="avatar" width="50" height="50" />
              </figure>
            </div>
            <div className="custom-file">
              <input onChange={handleAvatarChange} type="file" name="avatar" className="custom-file-input" id="customFile" />
              <label className="custom-file-label" htmlFor="customFile">
                Choose Avatar
              </label>
            </div>
          </div>
        </div>

        <h5 className="mt-4">Shop Information</h5>

        <div className="mb-3">
          <label>Shop Name</label>
          <input type="text" name="shopName" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input type="text" name="shopCategory" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea name="shopDescription" className="form-control" rows="3" onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Shop Request
        </button>
      </form>
    </div>
  );
};

export default ShopRequest;
