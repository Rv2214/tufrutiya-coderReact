import React from "react";

function Footer() {
  return (
    <footer className="bg-warning w-100 mt-auto">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="text-light m-2 mb-0">
              &copy; {new Date().getFullYear()} TU FRUTI YA! - 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
