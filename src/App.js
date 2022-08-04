import SideBar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import "./app.css";
import Home from "./pages/home/Home";
import TransactionsList from "./pages/transactions/TransactionsList";
import Stock from "./pages/stock/Stock";
import InsertStock from "./pages/insertStock/InsertStock";
import UserList from "./pages/userList/UserList";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import EditTransactions from "./pages/transactions/EditTransactions";
import EditInsertStock from "./pages/insertStock/EditInsertStock";
import AddInsertStock from "./pages/insertStock/AddInsertStock";
import AddTransactions from "./pages/transactions/AddTransactions";
import ListOrderUser from "./pages/transactions/ListOrderUser";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";

const Layout = () => (
  <>
    <TopBar />
    <div className="container">
      <SideBar />
      <Outlet />
    </div>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/transactionslist" element={<TransactionsList />} />
          <Route path="/transaction/:transactionId" element={<EditTransactions />} />
          <Route path="/newTransaction" element={<AddTransactions />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/insertStock" element={<InsertStock />} />
          <Route path="/insertStock/:insertStockId" element={<EditInsertStock />} />
          <Route path="/newStock" element={<AddInsertStock />} />
          <Route path="/account" element={<Account />} />
          <Route path="/listorderuser/:userId" element={<ListOrderUser />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App;
