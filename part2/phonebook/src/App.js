import React, { useState } from 'react'

const Number = ({entry}) => {
  return(
    <div>
      {entry.name} {entry.number}
    </div>
  );
}

const Numbers = (props) => {
  return (props.data.map(entry => <Number entry={entry} key={entry.name} />));
}

const NumberForm = (props) => {
  return(
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearchValue ] = useState('')

  /* Check if name exists, add new number */
  const addNumber = (event) => {
    event.preventDefault();
    const nameExists = persons.filter(entry => entry.name === newName);
    if (nameExists.length !== 0)
      alert(`${newName} is already added to the phonebook`);
    else {
      const newPersons = persons.concat({name: newName, number: newNumber});
      setPersons(newPersons);
    }
    setNewName('');
    setNewNumber('');
  }

  /* Event handlers for updating stateful inputs */
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchValue(event.target.value);

  /* Only show people whose names matches current searchValue */
  const filteredPersons = persons.filter(person => person.name.includes(searchValue));
  
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
      <Numbers data={filteredPersons} />
    </div>
  )
}

export default App