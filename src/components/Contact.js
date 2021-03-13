import {FaTimes, FaIdCard} from 'react-icons/fa'

export const Contact = ({contact, onDelete, onOpen}) => {
    return (
        <div className='task'>
            <h1>
            <a href={`https://nwm.zoom.us/j/${contact.roomId}`}>
            <FaIdCard 
                style={{cursor:'pointer'}} 
                onClick={()=>onOpen(contact._id)}/> 
                </a>
            </h1>
            <h3>{contact.name} 
            <FaTimes 
                style={{color:'red', cursor:'pointer'}} 
                onClick={()=>onDelete(contact._id)}/>
            </h3>
            <p>{contact.roomId}</p>
        </div>
    )
}

export default Contact