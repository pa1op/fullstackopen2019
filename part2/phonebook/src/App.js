import React, { useState } from 'react'

const Person = (props) => {
	return <p>{props.name} {props.number}</p>
}

const App = () => {
	const [ persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]) 
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ search, setSearch ] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleSearchChange = (event) => {
		setNewSearch(event.target.value)
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
		 setNewSearch('')
	}

	const matchingPersons = persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
	const personsToList = search ? matchingPersons : persons
	const addedPersons = personsToList.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)

	return (
		<div>
			<h2>Phonebook</h2>
			filter shown name <input value={search} onChange={handleSearchChange}/>
			<h2>add a new</h2>
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
