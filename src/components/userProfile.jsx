import React from "react";
import RoleUpdateForm from "./RoleUpdateForm";
import ForgotPasswordForm from "./forgotPassword";

const UserProfile = ({ userId }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
      <RoleUpdateForm userId={userId} />
      <ForgotPasswordForm />
    </div>
  );
};

export default UserProfile;
