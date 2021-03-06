import './App.css';
import {useState, useEffect} from 'react'
import Header from './components/Header'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'

function App() {

  const [showAddContact, setShowAddContact ] = useState(false)
  const [contacts, setContacts] = useState([])

  useEffect(()=> {
    const getContacts = async() => {
        const contactsFromServer = await fetchContacts()
        setContacts(contactsFromServer)
    }
    getContacts()
  }, [])

  const fetchContacts = async() => {  
    const res = await fetch('http://localhost:5000/contacts')
    const data = await res.json()
    return data
  }


  // Delete Contact
  const deleteContact = async (id)=>{
    console.log('deleting contact', id)
    
    await fetch(`http://localhost:5000/contacts/${id}`, {method:'DELETE'})
    
    setContacts(contacts.filter((contact)=> contact.id !== id))
  }

  // Open Contact
  const openContact = (id) =>{
     console.log('Call out to json server somewhere')
     
  }

  // Add Contact
  const addContact = async (contact) => {
    const res = await fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(contact),
    })

    const data = await res.json()

    setContacts([...contacts, data])
  }


  return (
    <div className="container">

        <Header 
          title="Zoom Contacts" 
          onShowAddPanel={() => setShowAddContact(!showAddContact)}
          showAddContact={!showAddContact} 
        />
      
        { showAddContact && <AddContact onAdd={addContact}/> }

        { contacts.length > 0 ?
        <Contacts 
          contacts={contacts}  
          onDelete={deleteContact} 
          onOpen={openContact}/>
          :
          'No Contacts setup'
        }
        </div>
  );
}

export default App;
