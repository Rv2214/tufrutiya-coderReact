import React, { useState } from "react";
import { useParams } from "react-router-dom";

const PasswordUpdateForm = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/sessions/resetpassword/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        alert("Contraseña actualizada exitosamente.");
      } else {
        const errorData = await response.json();
        console.error("Fallo al actualizar la contraseña:", errorData.message);
      }
    } catch (error) {
      console.error("Fallo al actualizar la contraseña:", error);
    }
  };

  return (
    <div>
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit} className="w-50 m-auto my-5">
        <label htmlFor="inputPassword" className="form-label">
          New Password:
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          aria-describedby="passwordHelpBlock"
          autoComplete="new-password"
          value={password}
          onChange={handleChange}
          required
        />
        <button
          id="newPasswordButton"
          type="submit"
          className="btn form-control btn-primary"
        >
          Save
        </button>
        <div id="passwordHelpBlock" className="form-text">
          Your password must be between 8 and 20 characters long, contain
          letters and numbers, and must not include spaces, special characters,
          or emojis.
        </div>
      </form>
    </div>
  );
};

export default PasswordUpdateForm;
