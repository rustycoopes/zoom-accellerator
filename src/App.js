import './App.css';
import {useState, useEffect} from 'react'
import Header from './components/Header'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'
import Filter from './components/Filter'
//require('dotenv').config()

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/'
console.log('backend url ', BACKEND_URL)

function App() {

  const [showAddContact, setShowAddContact ] = useState(false)
  const [contacts, setContacts] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect(()=> {
    const getContacts = async() => {
        const contactsFromServer = await fetchContacts()
        setContacts(contactsFromServer)
    }
    getContacts()
  }, [])

  const fetchContacts = async() => {  
    const res = await fetch(`${BACKEND_URL}contacts`)
    const data = await res.json()
    return data
  }


  // Delete Contact
  const deleteContact = async (id)=>{
    console.log('deleting contact', id)
    
    await fetch(`${BACKEND_URL}contacts/${id}`, {method:'DELETE'})
    
    setContacts(contacts.filter((contact)=> contact._id !== id))
  }

  // Open Contact
  const openContact = (id) =>{
     console.log('Call out to json server somewhere')
     
  }

  // Add Contact
  const addContact = async (contact) => {

    const res = await fetch(`${BACKEND_URL}contacts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(contact),
    })

    const data = await res.json()
    console.log(data)
    setContacts([...contacts, data])
  }

  const onFilter =(searchValue) => {
    setFilterText(searchValue)
  }
  const getFilteredContacts = ()=>{
    console.log(filterText)
    const filteredContacts = contacts.filter((contact) => { return contact.name.toLowerCase().indexOf(filterText.toLowerCase()) !==-1 })
    return filteredContacts
  }

  return (
    <div className="container">

        <Header 
          title="Zoom Contacts" 
          onShowAddPanel={() => setShowAddContact(!showAddContact)}
          showAddContact={!showAddContact} 
        />
      
        { showAddContact && <AddContact onAdd={addContact}/> }
        
        <Filter onChange={onFilter}/>

        { 
          getFilteredContacts().length > 0 ?
        
          <Contacts 
            contacts={getFilteredContacts()}  
            onDelete={deleteContact} 
            onOpen={openContact}/>
            :
            'No Contacts setup.'
        }
        
        <label className="footer" style={{fontSize:10}}>Rustyware 2020</label><br/>

        <label className="footer" style={{fontSize:8}}>Backend = {BACKEND_URL}</label>


        </div>
  );
}

export default App;
