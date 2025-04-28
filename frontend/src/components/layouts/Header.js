import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import { logOut } from "../../actions/userActions";
import { logOut as shopLogOut } from "../../actions/shopActions"; // <- important

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { isShopAuthenticated, shop } = useSelector((state) => state.shopState);
  
  const { items: cartItems } = useSelector((state) => state.cartState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    if (isAuthenticated) {
      dispatch(logOut);
    }
    if (isShopAuthenticated) {
      dispatch(shopLogOut);
    }
  };

  return (
    <nav className="navbar row mx-auto nav">
      <div className="col-12 col-md-3">
        <div className="navbar-brand mx-auto">
          <Link to="/">
            <img className="logo9" src="/images/logo11.png" alt="logo" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-13 col-md-3  mt-4 mt-md-0 text-center loginCartContain">

        
        {isAuthenticated || isShopAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle variant="default darkBlue pr-5" id="dropdown-basic">
              <figure className="avatar avatar-nav">
                <Image
                  width="50px"
                  src={
                    (isAuthenticated ? user?.avatar : shop?.avatar) ||
                    "./images/default_avatar.png"
                  }
                />
              </figure>
              <span>{isAuthenticated ? user?.name : shop?.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {isAuthenticated && user.role === "admin" && (
                <Dropdown.Item
                  onClick={() => {
                    navigate("/admin/Dashboard");
                  }}
                  className="text-primary"
                >
                  Dashboard
                </Dropdown.Item>
              )}

              {isShopAuthenticated && (
                <Dropdown.Item
                  onClick={() => {
                    navigate("/shop/shopdashboard");
                  }}
                  className="text-primary"
                >
                  Shop Dashboard
                </Dropdown.Item>
              )}

              {isAuthenticated   && (
                <Dropdown.Item
                  onClick={() => {
                    navigate("/myprofile");
                  }}
                  className="text-primary"
                >
                  Profile
                </Dropdown.Item>
              )}

              {isShopAuthenticated && (
                <Dropdown.Item
                  onClick={() => {
                    navigate("/shop/shopdashboard/profile");
                  }}
                  className="text-primary"
                >
                  Profile
                </Dropdown.Item>
              )}

              <Dropdown.Item onClick={logOutHandler} className="text-primary">
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        )}

        <div className="mx-auto cart-div">
          <Link to="/cart">
            <span>
              <i className="fa fa-shopping-cart fa-3x" aria-hidden="true"></i>
            </span>
          </Link>
          <Link to="/cart">
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>

      <div className="line"></div>
    </nav>
  );
};

export default Header;
