import React, { Component } from "react";
import { ContactForm } from './ContactForm/ContactForm'
import { ContactList } from './ContactList/ContactList'
import { Filter } from './Filter/Filter'

const CONTACTS_KEY = 'contacts'

export class App extends Component {

  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem(CONTACTS_KEY)

    if (savedContacts?.length > 0) {
      this.setState({
      contacts: JSON.parse(savedContacts)
    })
    }
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts))
    }
  }

  isDuplicate = ({ name }) => {
    const { contacts } = this.state
    const result = contacts.find(contactItem => contactItem.name.toLowerCase() === name.toLowerCase())
    return result
  }

  addContact = (contactObject) => {
    if (this.isDuplicate(contactObject)) {
      return alert(`${contactObject.name} is alredy in contacts`)
    }

    return this.setState(prevState => ({
      contacts: [...prevState.contacts, contactObject],
    }))
  }

  handlerFilterChange = (e) => {
    this.setState({
      filter: e.currentTarget.value
    }) 
  }

  deleteContact = (id) => {
    const { contacts } = this.state
    const newContacts = contacts.filter(contact => contact.id !== id)
    return this.setState({
      contacts: newContacts
    })    
  }
 

  render() {
    const { contacts, filter } = this.state
    const {addContact, handlerFilterChange, deleteContact} = this

    const filtredContacts = contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
    
    return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
  
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handlerFilterChange} />
      <ContactList contacts={filtredContacts} handleClick={deleteContact} />      
    </div>
  );
  }
};
