const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "school_db"
});

// Teacher Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM teachers WHERE username = ?", [username], (err, result) => {
    if (err) return res.json({ error: err });
    if (result.length === 0) return res.status(400).json({ message: "User not found" });

    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (isMatch) {
        const token = jwt.sign({ id: result[0].id }, "secret_key", { expiresIn: "1h" });
        res.json({ token });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    });
  });
});

// Fetch Students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

// Mark Attendance
app.post("/attendance", (req, res) => {
  const { student_id, date, status } = req.body;
  db.query("INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)", [student_id, date, status], (err) => {
    if (err) return res.json({ error: err });
    res.json({ message: "Attendance recorded" });
  });
});

// Record Marks
app.post("/marks", (req, res) => {
  const { student_id, course, marks } = req.body;
  db.query("INSERT INTO marks (student_id, course, marks) VALUES (?, ?, ?)", [student_id, course, marks], (err) => {
    if (err) return res.json({ error: err });
    res.json({ message: "Marks recorded" });
  });
});

// Fetch Timetable
app.get("/timetable", (req, res) => {
  db.query("SELECT * FROM timetable", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
