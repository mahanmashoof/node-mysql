import express from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "node1db",
});

const port = process.env.PORT || 5000;

//MIDDLEWARES---

//allows to send json files using a client:
app.use(express.json());

//create cookies
app.use(cookieParser());

//avoid cors issue:
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//--- (MIDDLEWARES)

app.get("/home", (req, res) => {
  db.query("SELECT * FROM countries", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/home/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM countries WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/home", (req, res) => {
  const sql = "INSERT INTO countries (countryName, population) VALUES (?)";
  const data = [req.body.countryName, req.body.population];
  db.query(sql, [data], (error) => {
    if (error) throw error;
    res.send(`${req.body.countryName} was created`);
  });
});

app.delete("/home/:id", (req, res) => {
  const countryId = req.params.id;
  const sql = "DELETE FROM countries WHERE id = ?";
  db.query(sql, [countryId], (err, result) => {
    if (err) throw err;
    res.send("country was successfully deleted");
  });
});

app.put("/home/:id", (req, res) => {
  const countryId = req.params.id;
  const sql =
    "UPDATE countries SET countryName = ? , population = ? WHERE id = ?";
  const data = [req.body.countryName, req.body.population];
  db.query(sql, [...data, countryId], (error) => {
    if (error) throw error;
    res.send(`${req.body.countryName} was updated`);
  });
});

//---AUTH:

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ Message: "Server error" });
    if (data.length > 0) {
      //generate a token and store it in a cookie
      const email = data[0].email;
      const token = jwt.sign({ email }, "prel-jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "success login" });
    } else {
      return res.json({ Message: "No record" });
    }
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "no token found" });
  } else {
    jwt.verify(token, "prel-jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Auth error" });
      } else {
        req.name = decoded.email;
        //req.name = "asd";
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "success verify", name: req.name });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "success logout" });
});

//--- (AUTH)

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
