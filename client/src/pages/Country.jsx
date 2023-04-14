import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Country() {
  axios.defaults.withCredentials = true;
  const [country, setCountry] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/home/${id}`);
        setCountry(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
  }, [id]);

  return (
    <div>
      {country.length > 0 && (
        <>
          <p>{country[0].countryName}</p>
          <p>{country[0].population}</p>
        </>
      )}
    </div>
  );
}

export default Country;
