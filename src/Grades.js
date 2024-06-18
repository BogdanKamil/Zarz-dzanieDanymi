import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import './Grades.css';

const pb = new PocketBase('http://localhost:8090');

function Grades() {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [newGrades, setNewGrades] = useState({});
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    fetchStudents();
    if (selectedSubject) {
      fetchGrades();
    }
  }, [selectedSubject]);

  const fetchStudents = async () => {
    try {
      const records = await pb.collection('students').getFullList();
      setStudents(records);
    } catch (error) {
      alert('Nie można pobrać uczniów: ' + error.message);
    }
  };

  const fetchGrades = async () => {
    try {
      const records = await pb.collection('grades').getFullList({
        filter: `przedmiot = '${selectedSubject}'`
      });
      // Konwersja listy ocen na obiekt, gdzie klucz to id studenta
      const gradesObj = {};
      records.forEach(grade => {
        if (!gradesObj[grade.studentId]) {
          gradesObj[grade.studentId] = [];
        }
        gradesObj[grade.studentId].push(grade);
      });
      setGrades(gradesObj);
    } catch (error) {
      alert('Nie można pobrać ocen: ' + error.message);
    }
  };

  const handleGradeChange = (studentId, gradeIndex, gradeValue) => {
    if (gradeValue >= 1 && gradeValue <= 6) {
      setGrades(prevGrades => {
        const updatedGrades = { ...prevGrades };
        updatedGrades[studentId][gradeIndex].ocena = gradeValue;
        return updatedGrades;
      });
    } else {
      alert('Ocena musi być z zakresu od 1 do 6!');
    }
  };

  const handleNewGradeChange = (studentId, grade) => {
    // Sprawdzenie, czy ocena mieści się w zakresie od 1 do 6
    if (grade >= 1 && grade <= 6) {
      setNewGrades(prevGrades => ({
        ...prevGrades,
        [studentId]: grade
      }));
    } else {
      alert('Ocena musi być z zakresu od 1 do 6!');
    }
  };

  const handleSubmitNewGrades = async () => {
    try {
      for (const [studentId, grade] of Object.entries(newGrades)) {
        await pb.collection('grades').create({
          studentId,
          przedmiot: selectedSubject,
          ocena: grade
        });
      }
      fetchGrades();
      setNewGrades({});
    } catch (error) {
      alert('Nie można zapisać ocen: ' + error.message);
    }
  };

  const handleDeleteGrade = async (gradeId) => {
    try {
      await pb.collection('grades').delete(gradeId);
      fetchGrades();
    } catch (error) {
      alert('Nie można usunąć oceny: ' + error.message);
    }
  };

  const handleEditGrade = (studentId) => {
    setEditingStudentId(studentId);
  };

  const handleSaveEditedGrades = async (studentId) => {
    try {
      const studentGrades = grades[studentId];
      for (const grade of studentGrades) {
        await pb.collection('grades').update(grade.id, { ocena: grade.ocena });
      }
      fetchGrades();
      setEditingStudentId(null);
    } catch (error) {
      alert('Nie można zaktualizować ocen: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Dziennik elektroniczny</h1>
      <div className="subject-tabs">
        <button onClick={() => setSelectedSubject('Matematyka')}>Matematyka</button>
        <button onClick={() => setSelectedSubject('Polski')}>Polski</button>
        <button onClick={() => setSelectedSubject('Angielski')}>Angielski</button>
      </div>
      <h2>{selectedSubject ? `Oceny dla: ${selectedSubject}` : 'Wybierz przedmiot'}</h2>
      {selectedSubject && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Oceny</th>
                <th>Nowa Ocena</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.imie}</td>
                  <td>{student.nazwisko}</td>
                  <td className="grades-row">
                    {grades[student.id] &&
                      grades[student.id].map((grade, index) => (
                        <div key={grade.id} className="grade-item">
                          {editingStudentId === student.id ? (
                            <div>
                              <input
                                type="number"
                                value={grade.ocena}
                                onChange={(e) => handleGradeChange(student.id, index, e.target.value)}
                              />
                              <button className="delete-button" onClick={() => handleDeleteGrade(grade.id)}>Usuń</button>
                            </div>
                          ) : (
                            <span>{grade.ocena}</span>
                          )}
                        </div>
                      ))}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newGrades[student.id] || ''}
                      onChange={(e) => handleNewGradeChange(student.id, e.target.value)}
                      placeholder=""
                    />
                  </td>
                  <td>
                    {!editingStudentId || editingStudentId !== student.id ? (
                      <button className="edit-button" onClick={() => handleEditGrade(student.id)}>Edytuj</button>
                    ) : (
                      <button className="save-button" onClick={() => handleSaveEditedGrades(student.id)}>Zapisz</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!editingStudentId && (
            <div>
              <button className="submit-button" onClick={handleSubmitNewGrades}>Zapisz nowe oceny</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Grades;
