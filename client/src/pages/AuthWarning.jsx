import React from "react";
import { useVerifyToken } from "../CustomHooks";
import { Link } from "react-router-dom";

function AuthWarning() {
  const { message } = useVerifyToken();
  return (
    <div>
      <h2>You are not authorized</h2>
      <p>{message}</p>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
}

export default AuthWarning;
