import Contact from './Contact'

function Contacts({contacts, onDelete, onOpen}) {

    return (
        <>
          {contacts.map((contact) =>(
          <Contact 
            key={contact.id} 
            contact={contact} 
            onDelete={onDelete} 
            onOpen={onOpen}/>))
          }  
        </>
    )
}

export default Contacts
