import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./Countries.css";
import { Link } from "react-router-dom";

const Countries = () => {
  axios.defaults.withCredentials = true;
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000").then((res) => {
      if (res.data.Status === "success verify") {
        setAuth(true);
        setName(res.data.name);
      } else {
        setAuth(false);
        setMessage(res.data.Message);
      }
    });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/logout")
      .then((res) => {
        if (res.data.Status === "success logout") {
          window.location.reload(true);
        } else {
          alert("Logout error");
        }
      })
      .catch((err) => console.log(err));
  };

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

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/home/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {auth ? (
        <>
          <p>Welcome {name}</p>
          <button>
            <Link to="/add">Add new country</Link>
          </button>
          <h1>Countries</h1>
          {countries.map((country, i) => (
            <div key={i}>
              <h4>{country.countryName}</h4>
              <p>{country.population}</p>
              <div style={{ display: "flex" }}>
                <button onClick={() => handleDelete(country.id)}>Delete</button>
                <button>
                  <Link to={`update/${country.id}`}>Edit</Link>
                </button>
                <button>
                  <Link to={`/${country.id}`}>View</Link>
                </button>
              </div>
            </div>
          ))}
          <button
            style={{ marginTop: "2rem", backgroundColor: "orange" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h2>You are not authorized</h2>
          <p>{message}</p>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default Countries;
