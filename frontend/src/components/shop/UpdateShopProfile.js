import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/shopActions";
import { toast } from "react-toastify";


const UpdateShopProfile = () => {
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.shopState);

  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    address: "",
    shopName: "",
    shopCategory: "",
    shopDescription: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");

  useEffect(() => {
    if (shop) {
      setFormData({
        ownerName: shop.name || "",
        phone: shop.phone || "",
        address: shop.address || "",
        shopName: shop.shopName || "",
        shopCategory: shop.category || "",
        shopDescription: shop.description || "",
      });

      if (shop.avatar?.url) {
        setAvatarPreview(shop.avatar.url);
      }
    }
  }, [shop]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("name", formData.ownerName);
    updatedData.append("phone", formData.phone);
    updatedData.append("address", formData.address);
    updatedData.append("shopName", formData.shopName);
    updatedData.append("category", formData.shopCategory);
    updatedData.append("description", formData.shopDescription);
    if (avatar) updatedData.append("avatar", avatar);

    dispatch(updateProfile(updatedData))
      .then(() => toast.success("Profile updated successfully"))
      .catch((err) => toast.error("Profile update failed"));
  };

  return (
    <div className="container" style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
      <h2 className="mb-4">Update Shop Profile</h2>
      <form onSubmit={handleSubmit}>
        <h5>Owner Information</h5>

        <div className="mb-3">
          <label>Owner Name</label>
          <input type="text" name="ownerName" className="form-control" value={formData.ownerName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
        </div>

        <h5 className="mt-4">Shop Information</h5>

        <div className="mb-3">
          <label>Shop Name</label>
          <input type="text" name="shopName" className="form-control" value={formData.shopName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input type="text" name="shopCategory" className="form-control" value={formData.shopCategory} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea name="shopDescription" className="form-control" rows="3" value={formData.shopDescription} onChange={handleChange} required></textarea>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="avatar_upload">Avatar</label>
          <div className="d-flex align-items-center">
            <div>
              <figure className="avatar mr-3 item-rtl">
                <img src={avatarPreview} className="rounded-circle me-3" alt="avatar" width="50" height="50" />
              </figure>
            </div>
            <div className="custom-file">
              <input onChange={handleAvatarChange} type="file" name="avatar" className="custom-file-input" id="customFile" />
              <label className="custom-file-label" htmlFor="customFile">Choose Avatar</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateShopProfile;
