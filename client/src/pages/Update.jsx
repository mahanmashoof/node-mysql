import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const location = useLocation();
  const countryId = location.pathname.split("/").slice(-1)[0];

  //TODO: populate these values by creating custom hook for fetch all and usememo
  const [input, setInput] = useState({
    countryName: "",
    population: null,
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/home/" + countryId, input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Update country</h1>
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
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default Update;
