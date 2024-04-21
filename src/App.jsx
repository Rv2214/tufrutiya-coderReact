import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ProductsList from "./components/CardProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
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

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:8080/">
            TU FRUTI YA!
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a
                className="nav-link active"
                aria-current="page"
                href="http://localhost:8080/"
              >
                Home
              </a>
              <a
                className="nav-link"
                href="http://localhost:8080/products/real"
              >
                Real
              </a>
              <a className="nav-link" href="http://localhost:8080/products">
                Productos
              </a>
              <a
                className="nav-link"
                href="http://localhost:8080/products/form"
              >
                Formulario
              </a>
              <a className="nav-link" href="http://localhost:8080/orders">
                Ordenes
              </a>
              <a
                className="nav-link"
                href="http://localhost:8080/sessions/register"
              >
                Registro
              </a>
              <a
                className="nav-link"
                href="http://localhost:8080/sessions/login"
              >
                Login
              </a>
              <span className="btn btn-warning fs-8" id="logout">
                Signout
              </span>
            </div>
          </div>
        </div>
      </nav>
      <ProductsList
        products={products}
        prevPage={handlePrevPage}
        nextPage={handleNextPage}
      />
      <footer className="bg-warning w-100">
        <p className="text-light m-2 text-center fw-bolder fs-4">
          TU FRUTI YA!
        </p>
      </footer>
    </>
  );
}

export default App;
