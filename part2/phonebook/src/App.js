import React, { useState, useEffect } from 'react';
import phonebookDbActions from './services/phonebookDbActions';

const Number = ({entry, deleteClickHandler}) => {
  return (
    <div>
      {entry.name} {entry.number} <button onClick={deleteClickHandler}>delete</button>
    </div>
  );
}

const Numbers = ({data, deleteClickHandler}) => {
  return (data.map(entry =>
    <Number
      entry={entry}
      key={entry.id}
      deleteClickHandler={() => deleteClickHandler(entry.id)}
    />));
}

const NumberForm = (props) => {
  return (
    <form onSubmit={props.addNumber}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  );
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearchValue ] = useState('')

  useEffect(() => {
    phonebookDbActions
      .getNumbers()
      .then(numbers => setPersons(numbers));
  }, []);

  /* Check if name exists, add/update number */
  const addNumber = (event) => {
    event.preventDefault();
    const newNumberObject = {name: newName, number: newNumber};
    const nameExists = persons.filter(entry =>
      entry.name.toLowerCase() === newName.toLowerCase());
    if (nameExists.length !== 0 &&
      window.confirm(`${nameExists[0].name} is already added to phonebook, replace the old number with a new one?`)
      )
    {
      phonebookDbActions
        .updateNumber(newNumberObject, nameExists[0].id)
        .then(response => {
          const newPersons = persons.map(person =>
            person.id === nameExists[0].id ? response : person);
          setPersons(newPersons);
        });
    }
    else if (nameExists.length === 0) {
      phonebookDbActions
        .postNumber(newNumberObject)
        .then(data => {
          const newPersons = persons.concat(data);
          setPersons(newPersons);
        }
      );
    }
    setNewName('');
    setNewNumber('');
  }

  /* Function for deleting a number */
  const deleteClickHandler = id => {
    const personToBeDeleted = persons.filter(person => person.id === id);
    if (personToBeDeleted.length > 0 &&
      window.confirm(`Delete ${personToBeDeleted[0].name} ?`))
    {
        phonebookDbActions
          .deleteNumber(id);
        const newPersons = persons.filter(person => person.id !== id);
        setPersons(newPersons);
    }
  }

  /* Event handlers for updating stateful inputs */
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchValue(event.target.value);

  /* Only show people whose names matches current searchValue */
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown entries with
        <input value={searchValue} onChange={handleSearchChange} />
      </div>
      <h2>Add a new number</h2>
      <NumberForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNumber={addNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Numbers data={filteredPersons} deleteClickHandler={deleteClickHandler} />
    </div>
  )
}

export default App