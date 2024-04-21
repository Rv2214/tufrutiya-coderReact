import React from 'react';

function ProductsList({ products, prevPage, nextPage }) {
  return (
    <div className="d-flex justify-content-between align-items-center m-4 my-4">
      <a onClick={prevPage} className="btn btn-primary">Anterior</a>  
      <div className="d-flex flex-wrap justify-content-evenly">
        {products.map(product => (
          <div key={product.id} className="card mb-4 m-8 mx-auto" style={{ width: '20rem', height: '350px' }}>
            <img src={product.photo} className="card-img-top h-50" alt="frutas" />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p>Price: {product.price}</p>
              <p>Stock: {product.stock}</p>
              <a href="#" className="btn btn-primary">Detalles</a>
            </div>
          </div>
        ))}
      </div>
      <a onClick={nextPage} className="btn btn-primary">Siguiente</a> 
    </div>
  );
}

export default ProductsList;
