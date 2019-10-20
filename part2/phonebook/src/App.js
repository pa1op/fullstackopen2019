import React, { useState } from 'react'

const Person = (props) => {
	return <p>{props.name} {props.number}</p>
}

const Persons = (props) => {
	return (
		props.personsToList.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)
	)
}

const Filter = (props) => {
	return (
		<p>filter shown name <input value={props.search} onChange={props.handleSearchChange}/></p>
	)
}

const PersonForm = (props) => {
	return (
		<>
		<div>
			name: <input value={props.newName} onChange={props.handleNameChange} />
			<br/>
			number: <input value={props.newNumber} onChange={props.handleNumberChange} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
</>
)
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
		setNewName(event.target.value) }

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

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={search} handleSearchChange={handleSearchChange}/>
			<h2>add a new</h2>
			<form onSubmit={addEntry}>
				<PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
			</form>
			<h2>Numbers</h2>
			<Persons personsToList={personsToList}/>
		</div>
	)
}

export default App
