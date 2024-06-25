import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import ProductsList from "./components/CardProduct";
import Navbar from "./components/navbar";
import Login from "./components/Login";
import Register from "./components/register";
import Orders from "./components/Orders";
import Form from "./components/Form";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import VerifiedCode from "./components/verifiedCode";
import { CartProvider } from "./components/CartContext";
import Footer from "./components/Footer";
import UserProfile from "./components/userProfile";
import PasswordUpdateForm from "./components/PasswordUpdateForm";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProducts(currentPage);
    fetchUser();
  }, [currentPage]);

  const fetchProducts = (page) => {
    axios(`http://localhost:8080/api/products?page=${page}`)
      .then((res) => setProducts(res.data.response.docs))
      .catch((err) => console.log(err));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((nextPage) => nextPage + 1);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/sessions/isauth",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        console.log("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProductsList
                  products={products}
                  prevPage={handlePrevPage}
                  nextPage={handleNextPage}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetail products={products} />}
            />
            <Route exact path="/login" element={<Login setUser={setUser} />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/verifiedcode" element={<VerifiedCode />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/form" element={<Form />} />
            {user && (
              <Route
                exact
                path="/userprofile"
                element={<UserProfile userId={user._id} />}
              />
            )}
            {user && (
              <Route
                exact
                path={`/passwordupdate/:token`}
                element={<PasswordUpdateForm />}
              />
            )}
          </Routes>
        </CartProvider>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
