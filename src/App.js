import SideBar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import "./app.css";
import Home from "./pages/home/Home";
import TransactionsList from "./pages/transactions/TransactionsList";
import Stock from "./pages/stock/Stock";
import InsertStock from "./pages/insertStock/InsertStock";
import UserList from "./pages/userList/UserList";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import EditTransactions from "./pages/transactions/EditTransactions";

function App() {
  return (
    <Router>
      <TopBar />
      <div className="container">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/transactionslist" element={<TransactionsList />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/insertStock" element={<InsertStock />} />
          <Route path="/transaction/:transactionId" element={<EditTransactions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
