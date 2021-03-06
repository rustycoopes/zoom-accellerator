import {FaTimes, FaIdCard} from 'react-icons/fa'

export const Contact = ({contact, onDelete, onOpen}) => {
    return (
        <div className='task'>
            <h1>
            <FaIdCard 
                style={{cursor:'pointer'}} 
                onClick={()=>onOpen(contact.id)}/> 
            </h1>
            <h3>{contact.name} 
            <FaTimes 
                style={{color:'red', cursor:'pointer'}} 
                onClick={()=>onDelete(contact.id)}/>
            </h3>
            <p>{contact.roomId}</p>
        </div>
    )
}

export default Contact