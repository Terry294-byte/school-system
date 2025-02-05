import { useEffect, useState } from "react";
import axios from "axios";

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/timetable").then(response => {
      setTimetable(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Timetable</h2>
      <ul>
        {timetable.map((entry, index) => (
          <li key={index}>{entry.course} - {entry.day} at {entry.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default Timetable;
