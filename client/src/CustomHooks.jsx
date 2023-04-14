import { useEffect, useState } from "react";
import axios from "axios";

export function useVerifyToken() {
  axios.defaults.withCredentials = true;
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      axios.get("http://localhost:5000").then((res) => {
        if (res.data.Status === "success verify") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { auth, name, message };
}
