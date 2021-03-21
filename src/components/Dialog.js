import {FaTimes} from 'react-icons/fa'

const Dialog = ({text, helpLink, onClose}) => {
    return (
                           
            <div >
                {
                text !== '' ?
                <div className="alert-warning">
                    <FaTimes 
                    style={{color:'white', cursor:'pointer'}} 
                    onClick={()=>onClose()}/>{text}
                    <br/>
                    {helpLink !== '' ?
                    <a href={helpLink}> More Details</a> 
                    : ''
                    }
                </div>
                :<label></label>
                }
            </div>
            
        )
}

export default Dialog
