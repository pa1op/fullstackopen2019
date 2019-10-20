import React, { useState } from 'react'

const Person = (props) => {
  return <p>{props.name} {props.number}</p>
}

const App = () => {
	const [ persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-1234567'}
	]) 
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')

	const handleNameChange = (event) => {
	  setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
	  setNewNumber(event.target.value)
	}

	const nameExists = () => {
	  const oldNamesList = persons.map((person)=> person.name)
	  return oldNamesList.includes(newName)
	}

	const addEntry = (event) => {
	   event.preventDefault()
		 nameExists() ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat({name: newName, number: newNumber}))
		 setNewName('')
		 setNewNumber('')
	}

	const addedPersons = persons.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addEntry}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
					<br/>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{addedPersons}
		</div>
	)
}

export default App
