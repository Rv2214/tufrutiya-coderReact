import React, { useState } from "react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/sessions/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        alert(
          "Se ha enviado un correo electrónico para restablecer la contraseña."
        );
      } else {
        const errorData = await response.json();
        console.error(
          "Fallo al solicitar restablecimiento de contraseña:",
          errorData.message
        );
      }
    } catch (error) {
      console.error(
        "Fallo al solicitar restablecimiento de contraseña:",
        error
      );
    }
  };

  return (
    <div>
      <h2>Solicit Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
