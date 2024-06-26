import React, { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const RoleUpdateForm = ({ userId }) => {
  const [role, setRole] = useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/api/users/${userId}`,
        {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role: Number(role) }),
        }
      );

      if (response.ok) {
        alert("Role updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to update role:", errorData.message);
      }
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    <div>
      <h2>Update Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="role">Role:</label>
          <input
            type="number"
            id="role"
            className="form-control"
            value={role}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Role
        </button>
      </form>
    </div>
  );
};

export default RoleUpdateForm;
