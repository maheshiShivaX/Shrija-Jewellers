import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from './components/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Cart from './components/cart';
import AdminLogin from './components/admin/login';
import Dashboard from './components/admin/dashboard';
import ForgotPassword from './components/auth/forgotpassword';
// import Products from './components/products';
import ProductDetail from './components/productdetail';
import ProductCategoryList from './components/productcategorylist';
import ShippingAddress from './components/shippingaddress';
import ProductSubCategory from './components/productsubcategory';
import AdminProductCategory from './components/admin/masters/productCategory';
import AdminProductSubCategory from './components/admin/masters/productsubcategory';
import Products from './components/products';
import AdminProductDetail from './components/admin/masters/productDetail';
import AdminSpecification from './components/admin/masters/specification';
import useAuth from './components/tokenAuth';
import Checkout from './components/checkout';
import ProductList from './components/productList';


function App() {
  return (
    <>    
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="category/:id/productsubcategory" element={<ProductSubCategory />} />
          <Route path="productcategorylist" element={<ProductCategoryList />} />
          <Route path="productslist" element={<ProductList />} />
          <Route path="/category/:categoryId/productsubcategory/:subcategoryId/products" element={<Products />} />
          <Route path="/category/:categoryId/productsubcategory/:subcategoryId/products/:productsId/productdetail" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shippingaddress" element={<ShippingAddress />} />
          <Route path="checkout" element={< Checkout/>} />
          <Route path="admin">
            <Route path="adminlogin" element={<AdminLogin />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="masters/productcategory" element={<AdminProductCategory />} />
            <Route path="masters/productsubcategory" element={<AdminProductSubCategory />} />
            <Route path="masters/productdetail" element={<AdminProductDetail />} />
            <Route path="masters/specification" element={<AdminSpecification/>} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
