import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/students/')
      .then(res => {
        const data = res.data.map(s => ({ ...s, present: false }));
        setStudents(data);
      });
  }, []);

  const handleCheck = (index) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const submitAttendance = () => {
    axios.post('http://127.0.0.1:8000/api/mark/', students)
      .then(() => alert("Attendance Submitted"));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Attendance</h1>
      {students.map((student, index) => (
        <div key={student.id}>
          <input
            type="checkbox"
            checked={student.present}
            onChange={() => handleCheck(index)}
          />
          {student.name}
        </div>
      ))}
      <button onClick={submitAttendance}>Submit</button>
    </div>
  );
}

export default App;