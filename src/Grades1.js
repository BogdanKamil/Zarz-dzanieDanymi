import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import './styles.css'; 

const pb = new PocketBase('http://127.0.0.1:8090');



function Grades() {
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({
    imie: '',
    nazwisko: '',
    przedmiot: '',
    ocena: ''
  });
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('imie');
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const records = await pb.collection('dziennik').getFullList();
      setGrades(records);
    } catch (error) {
      alert('Nie mozna dodac oceny: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGrade(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdRecord = await pb.collection('dziennik').create(newGrade);
      setGrades([...grades, createdRecord]);
      setNewGrade({ imie: '', nazwisko: '', przedmiot: '', ocena: '' });
    } catch (error) {
      alert('Nie mozna dodac oceny: ' + error.message);
    }
  };
 
  const handleDelete = async (id) => {
    try {
      await pb.collection('dziennik').delete(id);
      setGrades(grades.filter(grade => grade.id !== id));
    } catch (error) {
      alert('Nie mozna usunac oceny: ' + error.message);
    }
  };

  const handleEdit = (grade) => {
    setEditingGrade(grade);
    setNewGrade(grade);
  };

  const handleUpdate = async () => {
    try {
      await pb.collection('dziennik').update(editingGrade.id, newGrade);
      const updatedGrades = grades.map(grade => (grade.id === newGrade.id ? newGrade : grade));
      setGrades(updatedGrades);
      setNewGrade({ imie: '', nazwisko: '', przedmiot: '', ocena: '' });
      setEditingGrade(null);
    } catch (error) {
      alert('Nie mozna zaktualizowac oceny: ' + error.message);
    }
  };

  // Filtrowanie ocen
  const filteredGrades = grades.filter(grade => {
    const fullName = `${grade.imie} ${grade.nazwisko}`;
    return fullName.toLowerCase().includes(filterText.toLowerCase());
  });

  // Sortowanie ocen
  const sortedGrades = filteredGrades.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  return (
    <div>
      <h1>Dziennik elektroniczny</h1>
      {/* Interfejs użytkownika do filtrowania i sortowania */}
      <div>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Search..."
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="imie">Imię</option>
          <option value="nazwisko">Nazwisko</option>
          <option value="przedmiot">Przedmiot</option>
          <option value="ocena">Ocena</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="imie"
          value={newGrade.imie}
          onChange={handleChange}
          placeholder="Imię"
          required
        />
        <input
          type="text"
          name="nazwisko"
          value={newGrade.nazwisko}
          onChange={handleChange}
          placeholder="Nazwisko"
          required
        />
        <input
          type="text"
          name="przedmiot"
          value={newGrade.przedmiot}
          onChange={handleChange}
          placeholder="Przedmiot"
          required
        />
        <input
          type="number"
          name="ocena"
          value={newGrade.ocena}
          onChange={handleChange}
          placeholder="Ocena"
          required
        />
        <button type="submit">Wstaw ocene</button>
      </form>
      <h2>Oceny</h2>
      <ul>
        {/* Wyświetlanie posortowanych i przefiltrowanych ocen */}
        {sortedGrades.map((grade) => (
                    <li key={grade.id}>
                    {grade.imie} {grade.nazwisko} - {grade.przedmiot} - {grade.ocena}
                    <button onClick={() => handleEdit(grade)}>Edit</button>
                    <button onClick={() => handleDelete(grade.id)}>Delete</button>
                  </li>
                ))}
              </ul>
              {/* Formularz edycji */}
              {editingGrade && (
                <div>
                  <h2>Edit Grade</h2>
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      name="imie"
                      value={newGrade.imie}
                      onChange={handleChange}
                      placeholder="Imię"
                      required
                    />
                    <input
                      type="text"
                      name="nazwisko"
                      value={newGrade.nazwisko}
                      onChange={handleChange}
                      placeholder="Nazwisko"
                      required
                    />
                    <input
                      type="text"
                      name="przedmiot"
                      value={newGrade.przedmiot}
                      onChange={handleChange}
                      placeholder="Przedmiot"
                      required
                    />
                    <input
                      type="number"
                      name="ocena"
                      value={newGrade.ocena}
                      onChange={handleChange}
                      placeholder="Ocena"
                      required
                    />
                    <button type="submit">Update</button>
                  </form>
                </div>
              )}
            </div>
          );
        }
        
        export default Grades;
        
