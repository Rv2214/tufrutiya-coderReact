import React, { useState } from "react";

function VerifiedCode() {
  const [email, setEmail] = useState("");
  const [verifiedCode, setVerifiedCode] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleVerifiedCodeChange = (event) => {
    setVerifiedCode(event.target.value);
  };

  const handleVerification = async () => {
    try {
      const data = { email, verifiedCode };
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      };
      let response = await fetch(
        "http://localhost:8080/api/sessions/verify-account",
        opts
      );
      response = await response.json();
      if (response.statusCode === 200) {
        alert("Account verified successfully!");
        window.location.replace("/login");
      } else {
        alert("ERROR: " + response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-50 m-auto my-5">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="verifiedCode" className="form-label">
            Verification Code
          </label>
          <input
            type="text"
            className="form-control"
            id="verifiedCode"
            value={verifiedCode}
            onChange={handleVerifiedCodeChange}
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleVerification}
        >
          Verify Account
        </button>
      </form>
    </div>
  );
}

export default VerifiedCode;
