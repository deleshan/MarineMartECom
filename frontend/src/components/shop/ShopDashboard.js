import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import axios from "axios";

const ShopDashboard = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  // Counters for dashboard cards
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const isActive = (path) => location.pathname.includes(path);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Fetch product and order counts
  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/v1/shop/dashboard-data", {
        withCredentials: true,
      });
      setProductCount(data.products || 0);
      setOrderCount(data.orders || 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        {showSidebar && (
          <div className="col-md-2 bg-dark rounded-right p-4 rounded h-75 d-inline-block">
            <h4 className="text-light mb-4 ">🛒 Shop Dashboard</h4>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link
                  to="/shop/shopdashboard/products"
                  className={`nav-link ${isActive("/products") ? "active text-secondary fw-bold" : "text-light"}`}
                >
                  Product 
                  Management
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/shop/shopdashboard/orders"
                  className={`nav-link ${isActive("/orders") ? "active text-secondary fw-bold" : "text-light"}`}
                >
                  Order 
                  Management
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/shop/shopdashboard/sales"
                  className={`nav-link ${isActive("/sales") ? "active text-secondary fw-bold" : "text-light"}`}
                >
                  Sales 
                  Report
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Main Content */}
        <div className={`col ${showSidebar ? "col-md-10" : "col-12"} p-4`}>
          {/* Toggle sidebar button on small screens */}
          <button className="btn btn-outline-secondary d-md-none mb-3" onClick={toggleSidebar}>
            <FaBars /> Menu
          </button>

          {/* Dashboard Summary Cards */}
          <div className="row">
            <div className="col-xl-4 col-sm-6 mb-4">
              <div className="card text-white bg-success o-hidden h-60 ">
                <div className="card-body text-center">
                  <div className="card-font-size">
                    Products
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/shop/shopdashboard/products"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-4 col-sm-6 mb-4">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body text-center">
                  <div className="card-font-size">
                    Orders
                  
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/shop/shopdashboard/orders"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-4 col-sm-6 mb-4">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body text-center">
                  <div className="card-font-size">
                    Sales Report
                    <br /> 
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/shop/shopdashboard/sales"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Page content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;
