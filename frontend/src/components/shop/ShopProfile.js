import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { closeShop } from "../../actions/shopActions"; // adjust path if needed
import Loader from "../layouts/Loader";

const ShopProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, shop } = useSelector((state) => state.shopState);

  const handleCloseShop = async () => {
    if (window.confirm("Are you sure you want to close your shop? This action cannot be undone!")) {
      try {
        await dispatch(closeShop());
        toast.success("Shop closed successfully.");
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to close shop");
      }
    }
  };

  if (loading || !shop) return <Loader />;

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      <div className="card shadow p-4 text-left">
        <div className="text-center mb-4">
          <img
            src={shop.avatar || "/images/default_avatar.png"}
            alt="Shop Avatar"
            className="rounded profileImage"
            width="300"
            height="150"
            
          />
        </div>

        <h3 className="text-center mb-4">{shop.shopName}</h3>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Owner's Name:</strong> {shop.name}
          </div>
          <div className="col-md-6">
            <strong>Email:</strong> {shop.email}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Phone:</strong> {shop.phone}
          </div>
          <div className="col-md-6">
            <strong>Address:</strong> {shop.address}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Category:</strong> {shop.category}
          </div>
          <div className="col-md-6">
            <strong>Status:</strong>{" "}
            {shop.status === "approved" ? (
              <span className="text-success">Approved</span>
            ) : (
              <span className="text-warning">Pending</span>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <strong>Description:</strong>
            <p>{shop.description}</p>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <Link to="/shop/updateprofile" className="btn btn-primary">
             Edit Profile
          </Link>
          <button onClick={handleCloseShop} className="btn btn-danger">
             Close Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
