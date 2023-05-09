import { useState, useEffect } from "react";
import axios from "axios";

export const useGetAllCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/home");
        setCountries(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCountries();
  }, []);
  return { countries };
};
