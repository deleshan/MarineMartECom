import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to={"/admin/dashboard"}>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          {/* Product Dropdown */}
          <li>
            <Link to={"/admin/products"}>
              <i className="fa fa-shopping-basket"></i> Products
            </Link>
          </li>

          {/* Manage Shops Dropdown */}
          <li>
            <NavDropdown title={<span><i className="fa fa-store"></i> Manage Shops</span>}>
              <NavDropdown.Item onClick={() => navigate("/admin/shop")}>
                <i className="fa fa-store"></i> Shop List
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/admin/shoprequest")}>
                <i className="fa fa-store-alt"></i> Shop Requests
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <Link to={"/admin/orders"}>
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to={"/admin/users"}>
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <Link to={"/admin/Reviews"}>
              <i className="fa fa-star"></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
