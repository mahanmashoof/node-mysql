import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    countryName: "",
    population: null,
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/home", input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add new country</h1>
      <input
        type="text"
        placeholder="country"
        name="countryName"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="population"
        name="population"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default Add;
