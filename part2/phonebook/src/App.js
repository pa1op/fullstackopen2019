import React, { useState } from 'react'

const Person = (props) => {
  return <p>{props.name}</p>
}

const App = () => {
	const [ persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	]) 
	const [ newName, setNewName ] = useState('')

	const addName = (event) => {
	   event.preventDefault()
		 const person = { name: newName }
		 setPersons(persons.concat(person))
		 setNewName('')
	}

	const handleInputChange = (event) => {
	  setNewName(event.target.value)
	}

	const addedPersons = persons.map((person) => <Person key={person.name} name={person.name} />)

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleInputChange} />
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
