import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", input)
      .then((res) => {
        if (res.data.Status === "success login") {
          navigate("/");
          window.location.reload();
        } else {
          alert(res.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
