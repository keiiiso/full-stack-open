import {useEffect, useState} from 'react'
import {Filter} from './components/Filter.jsx'
import {PersonForm} from './components/PersonForm.jsx'
import {Person} from './components/Person.jsx'
import {Notification} from './components/Notification.jsx'
import personService from './services/persons.js'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [notification, setNotification] = useState('')
    const [notificationColor, setNotificationColor] = useState('')

    const personsToShow = searchQuery ? persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase())) : persons

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const handleAddPerson = (event) => {
        event.preventDefault()

        const existingPerson = persons.find((person) => person.name === newName)

        if (existingPerson) {
            if (window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
                const updatedPerson = {
                    ...existingPerson,
                    number: newNumber
                }
                personService
                    .update(existingPerson.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person =>
                            person.id === existingPerson.id ? returnedPerson : person))
                    })
                    .catch(({response}) => {

                        // console.log(response)

                        if (response.status === 400) { // If field validation error
                            setNotification(response.data.error)
                            setNotificationColor('error')

                            setTimeout(() => {
                                setNotification(null)
                                setNotificationColor(null)
                            }, 5000)
                        } else { // If person has already been deleted
                            setNotification(`Information of ${existingPerson.name} has already been removed from the server`)
                            setNotificationColor('error')

                            setPersons(persons.filter(person => person.id !== existingPerson.id))

                            setTimeout(() => {
                                setNotification(null)
                                setNotificationColor(null)
                            }, 5000)
                        }
                    })
            }
        } else {
            const person = {
                name: newName,
                number: newNumber,
            }

            personService
                .create(person)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')

                    setNotification(`Added ${person.name}`)
                    setNotificationColor('success')
                    setTimeout(() => {
                        setNotification(null)
                        setNotificationColor(null)
                    }, 5000)
                })
                .catch(({response}) => {
                    // console.log(response)
                    setNotification(response.data.error)
                    setNotificationColor('error')
                    setTimeout(() => {
                        setNotification(null)
                        setNotificationColor(null)
                    }, 5000)
                })
        }
    }

    const handleDeletePerson = deletedPerson => {

        if (window.confirm(`Delete ${deletedPerson.name}?`)) {
            personService
                .remove(deletedPerson.id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== deletedPerson.id))
                })
        }
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value)
    }

    return (
        <div>
            <h1> Phonebook </h1>

            <Notification message={notification} color={notificationColor}/>

            <Filter query={searchQuery} onChange={handleSearchQuery}/>

            <h1> add a new </h1>

            <PersonForm onSubmit={handleAddPerson}
                        newName={newName}
                        newNumber={newNumber}
                        onNameChange={handleNewName}
                        onNumberChange={handleNewNumber}/>

            <h1> Numbers </h1>

            <ul>
                {personsToShow.map(person =>
                    <Person
                        key={person.id}
                        person={person}
                        onDelete={() => handleDeletePerson(person)}
                    />
                )}
            </ul>
        </div>
    )
}

export default App