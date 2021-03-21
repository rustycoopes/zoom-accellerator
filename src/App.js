import './App.css';
import {useState} from 'react'
import Header from './components/Header'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import Login from './components/Login'
import Dialog from './components/Dialog'



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/'
console.log('backend url ', BACKEND_URL)

function App() {

  const [showAddContact, setShowAddContact ] = useState(false)
  const [contacts, setContacts] = useState([])
  const [filterText, setFilterText] = useState('')
  const [currentUserName, setCurrentUserName] = useState('')
  const [currentUserAccount, setCurrentAccountId] = useState(0)
  const [loginError, setLoginError] = useState('')
  const [loginErrorLink, setLoginErrorLink] = useState('')

  // useEffect(()=> {
  //   const getContacts = async() => {
  //       const contactsFromServer = await fetchContacts()
  //       setContacts(contactsFromServer)
  //   }
  //   getContacts()
  // }, [])

  // TODO : MOVE BACK TO REST CALL WHEN STABLE
  const fetchContacts = async(accountid) => {  
    console.log('Requesting data for account ', accountid)
    const request_url =`${BACKEND_URL}contacts/account?accountId=${accountid}`
    console.log(request_url)
    const res = await fetch(request_url)
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

    contact.accountid = currentUserAccount    

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

  const onLoginSuccess= (user)=>{
    console.log('User logged in :', user)
      setCurrentUserName(user.name)
      setCurrentAccountId(user.accountid)
      setLoginError('')
      setLoginErrorLink('')

      const getContacts = async() => {
        const contactsFromServer = await fetchContacts(user.accountid)
        setContacts(contactsFromServer)
      }
      getContacts()
  }

  const onLoginFailure= (error, link)=>{
    setLoginError(error)
    setLoginErrorLink(link)
  }

  const onLoginWarningClose =()=>{
    setLoginError('')
    setLoginErrorLink('')
  }

  return (
    <div className="container">
        { currentUserName !== '' ?
            <label>Welcome {currentUserName}</label>
            : <Login onSuccess={onLoginSuccess} onFailure={onLoginFailure}/>
        }

        <Header 
          title={`Zoom Contacts`} 
          onShowAddPanel={() => setShowAddContact(!showAddContact)}
          showAddContact={!showAddContact} 
        />

        <Dialog text={loginError} helpLink={loginErrorLink} onClose={onLoginWarningClose}/>
      
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
