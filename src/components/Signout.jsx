import React from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

function Signout({ setUser }) {
  const handleSignout = async () => {
    try {
      const opts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      };
      let response = await fetch(`${apiUrl}/api/sessions/signout`, opts);
      response = await response.json();
      if (response.statusCode === 200) {
        alert("Session has been successfully closed.");
        setUser(null); 
        window.location.replace('/');
      } else {
        alert('ERROR: ' + response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button id="logout" type="button" className="btn btn-warning fs-8" onClick={handleSignout}>
      Signout
    </button>
  );
}

export default Signout;


