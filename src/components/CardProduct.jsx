import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function ProductsList({ products, prevPage, nextPage }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center mx-auto my-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col mb-4">
                <div className="card h-100">
                  <img
                    src={product.photo}
                    className="card-img-top"
                    alt="frutas"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-warning d-block mx-auto mb-2"
                      style={{ width: "120px" }}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-4 btns__productconteiner">
            <div className="col d-flex justify-content-between">
              <button onClick={prevPage} className="btn btn-warning">
                Back
              </button>
              <button
                onClick={nextPage}
                className="btn btn-warning btn__products"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
