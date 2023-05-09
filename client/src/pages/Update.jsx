import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllCountries } from "../api/CustomHooks";

const Update = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const location = useLocation();
  const countryId = location.pathname.split("/").slice(-1)[0];

  const { countries } = useGetAllCountries();
  const currentCountry = useMemo(() => {
    return countries.filter((country) => country.id.toString() === countryId);
  }, [countries, countryId]);

  const [input, setInput] = useState({
    countryName: "",
    population: null,
  });

  useEffect(() => {
    if (currentCountry.length > 0) {
      setInput({
        countryName: currentCountry[0].countryName,
        population: currentCountry[0].population,
      });
    }
  }, [currentCountry]);

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
      {countries.length > 0 && (
        <>
          <input
            type="text"
            defaultValue={input.countryName}
            name="countryName"
            onChange={handleChange}
          />
          <input
            type="number"
            defaultValue={input.population}
            name="population"
            onChange={handleChange}
          />
        </>
      )}
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default Update;
