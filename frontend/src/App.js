import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./components/product/ProductDetail";
import ProductSearch from "./components/product/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrders from "./components/order/UserOrders";
import OrderDetail from "./components/order/OrderDetail";

// Admin Components
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrder from "./components/admin/UpdateOrder";
import UserListForAdmin from "./components/admin/UserListForAdmin";
import UpdateUser from "./components/admin/UpdateUser";
import ReviewsList from "./components/admin/ReviewsList";
import ShopList from "./components/admin/ShopList";
import ShopRequestList from "./components/admin/ShopRequestList";

// Shop Owner Components
import ShopRequest from "./components/shop/ShopRequest";
import ShopLoginPage from "./components/shop/ShopLoginPage";
import ShopDashboard from "./components/shop/ShopDashboard";
import ShopProducts from "./components/shop/ShopProducts";
import ShopOrders from "./components/shop/ShopOrders";
import SalesReport from "./components/shop/SalesReport";
import ProductForm from "./components/shop/ProductForm";
import EditProduct from "./components/shop/EditProduct";
import ShopProfile from "./components/shop/ShopProfile";
import { loadShop } from "./actions/shopActions";
import UpdateShopProfile from "./components/shop/UpdateShopProfile";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadShop());
    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <HelmetProvider>
        <Header />
        <div className="container container-fluid m-auto">
          <ToastContainer theme="dark" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<ProductSearch />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            {/* Authenticated User Routes */}
            <Route path="/myprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/myprofile/update/password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
            <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
            <Route path="/order/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
            <Route path="/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  </ProtectedRoute>
                }
              />
            )}

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
            <Route path="/admin/products/create" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
            <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} />
            <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><UpdateOrder /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UserListForAdmin /></ProtectedRoute>} />
            <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ReviewsList /></ProtectedRoute>} />
            <Route path="/admin/shop" element={<ProtectedRoute isAdmin={true}><ShopList /></ProtectedRoute>} />
            <Route path="/admin/shoprequest" element={<ProtectedRoute isAdmin={true}><ShopRequestList /></ProtectedRoute>} />

            {/* Shop Owner Routes */}
            <Route path="/loginshopowner" element={<ShopLoginPage />} />
            <Route path="/registershopowner" element={<ShopRequest />} />
            <Route path="/shop/shopdashboard" element={<ProtectedRoute isShopOwner={true}><ShopDashboard /></ProtectedRoute>} >
            <Route path="/shop/shopdashboard/products" element={<ProtectedRoute isShopOwner={true}><ShopProducts /></ProtectedRoute>} />
            <Route path="/shop/shopdashboard/orders" element={<ProtectedRoute isShopOwner={true}><ShopOrders /></ProtectedRoute>} />
            <Route path="/shop/shopdashboard/sales" element={<ProtectedRoute isShopOwner={true}><SalesReport /></ProtectedRoute>} />
            <Route path="/shop/shopdashboard/products/new" element={<ProtectedRoute isShopOwner={true}><ProductForm /></ProtectedRoute>} />
            <Route path="/shop/shopdashboard/products/edit/:id" element={<ProtectedRoute isShopOwner={true}><EditProduct /></ProtectedRoute>} />
            <Route path="/shop/shopdashboard/profile" element={<ProtectedRoute isShopOwner={true}><ShopProfile /></ProtectedRoute>} />
            <Route path="/shop/shopdashboard/editprofile" element={<ProtectedRoute isShopOwner={true}><UpdateShopProfile /></ProtectedRoute>} />
            </Route>
            
            
          </Routes>
        </div>
        <Footer />
      </HelmetProvider>
    </Router>
  );
}

export default App;