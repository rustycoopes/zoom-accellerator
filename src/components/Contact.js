import {FaTimes} from 'react-icons/fa'
import { SiGooglehangoutsmeet } from "react-icons/si";

export const Contact = ({contact, onDelete, onOpen}) => {
    return (
        <div className='task'>
            <div className="rTable" style={{width:'100%'}}>
            <div className="rTableRow">
            <div className="rTableCell" style={ {width: "100%" }}>               
                <h3>{contact.name} </h3>
                <p>{contact.roomId}</p>
            </div>
            <div className="rTableCell" >               
                <h2>            
                <a href={`https://nwm.zoom.us/j/${contact.roomId}`} target="_blank">
                <SiGooglehangoutsmeet 
                    style={{cursor:'pointer'}} 
                    onClick={()=>onOpen(contact._id)}/> 
                    </a>
                </h2>
                <FaTimes 
                    style={{color:'red', cursor:'pointer'}} 
                    onClick={()=>onDelete(contact._id)}/>
            </div>
            </div>
            </div>    
        </div>
    )
}

export default Contact