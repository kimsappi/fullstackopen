import React, { useState, useEffect } from 'react';
import phonebookDbActions from './services/phonebookDbActions';
import './index.css';

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

const StatusMessage = ({status}) => {
  if (Object.keys(status).length === 0)
    return null;
  const classes = status.error ? 'status error' : 'status';
  return (
    <div className={classes}>{status.message}</div>
  );
}

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchValue, setSearchValue ] = useState('');
  const [ statusMessage, setStatusMessage ] = useState({});

  useEffect(() => {
    phonebookDbActions
      .getNumbers()
      .then(numbers => setPersons(numbers));
  }, []);

  /* Function that handles setting and removing status message automatically */
  const setStatus = (message, error) => {
    const statusObject = {message: message, error: error};
    setStatusMessage(statusObject);
    setTimeout(() => setStatusMessage({}), 3000);
  }

  /* Check if name exists, add/update number */
  const addNumber = (event) => {
    event.preventDefault();
    const newNumberObject = {name: newName, number: newNumber};
    const nameExists = persons.filter(entry =>
      entry.name.toLowerCase() === newName.toLowerCase());
    if (
        nameExists.length !== 0 &&
        window.confirm(`${nameExists[0].name} is already added to phonebook, replace the old number with a new one?`)
    )
    {
      phonebookDbActions
        .updateNumber(newNumberObject, nameExists[0].id)
        .then(response => {
          const newPersons = persons.map(person => person.id === response.id ? response : person);
          setPersons(newPersons);
          setStatus(`Updated ${newName}`, false);
        })
        .catch(error => setStatus(error.response.data.error, true));
    }
    else if (nameExists.length === 0) {
      phonebookDbActions
        .postNumber(newNumberObject)
        .then(data => {
          const newPersons = persons.concat(data);
          setPersons(newPersons);
          setStatus(`Added ${newName}`, false);
        })
        .catch(error => setStatus(error.response.data.error, true));
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
          .deleteNumber(id)
          .then(setStatus(`Deleted ${personToBeDeleted[0].name}`, false))
          .catch(() => setStatus(`Information of ${personToBeDeleted[0].name} has already been removed from server`, true));
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
      <StatusMessage status={statusMessage} />
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
