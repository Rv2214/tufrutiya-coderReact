import React, { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

function Form() {
  const [formData, setFormData] = useState({
    title: "",
    photo: "",
    stock: "",
    price: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Producto creado exitosamente");
        console.log("Producto creado:", data);
        setFormData({
          title: "",
          photo: "",
          stock: "",
          price: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error al crear el producto:", errorData.message);
        alert("Error al crear el producto: " + errorData.message);
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Error al crear el producto: " + error.message);
    }
  };

  return (
    <div className="bodyform">
      <form className="w-50 m-auto my-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Photo
          </label>
          <input
            type="text"
            className="form-control"
            id="photo"
            value={formData.photo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <button
          id="newProduct"
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          CREATE!
        </button>
      </form>
    </div>
  );
}

export default Form;
