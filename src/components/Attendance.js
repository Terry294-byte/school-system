import { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/students").then(response => {
      setStudents(response.data);
    });
  }, []);

  const handleMarkAttendance = (id, status) => {
    axios.post("http://localhost:5000/attendance", { student_id: id, date: new Date(), status })
      .then(() => alert("Attendance marked"));
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      {students.map(student => (
        <div key={student.id}>
          {student.name} ({student.admission_number}) 
          <button onClick={() => handleMarkAttendance(student.id, "Present")}>Present</button>
          <button onClick={() => handleMarkAttendance(student.id, "Absent")}>Absent</button>
        </div>
      ))}
    </div>
  );
};

export default Attendance;
