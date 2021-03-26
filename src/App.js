import './App.css';
import {useState} from 'react'
import Header from './components/Header'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import { Helmet } from 'react-helmet'
import Dialog from './components/Dialog'
import Toggle from './components/Toggler'
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes"
import  {useDarkMode} from "./components/useDarkMode"

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
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme

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

  const onLogout =()=>{
    console.log('logging out !')
    setCurrentUserName('')
    setCurrentAccountId('')
    setContacts([])
  }
  return (
    <ThemeProvider theme={themeMode}>
    <>
    <GlobalStyles/>
      <div className="container">
      
          <Helmet>
            <title>Zoom Contacts - RustyWare</title>
            <meta name="description" content="Rusty Software Zoom contact Manager" />
          </Helmet>
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <Header 
            title={`Zoom Contacts`} 
            onShowAddPanel={() => setShowAddContact(!showAddContact)}
            showAddContact={!showAddContact} 
            userName = {currentUserName}
            onLoginSuccess = {onLoginSuccess}
            onLoginFailure = {onLoginFailure}
            onLogoutSuccess= {onLogout}
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
        </>
    </ThemeProvider>
  );
}

export default App;
