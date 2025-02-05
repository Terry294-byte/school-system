import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Attendance from "./Attendance";
import Timetable from "./Timetable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/timetable" element={<Timetable />} />
      </Routes>
    </Router>
  );
}

export default App;
