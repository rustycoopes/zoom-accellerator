import Button from './Button'
import Login from './Login'
import Logout from './Logout'

const Header = ({title, onShowAddPanel, showAddContact,userName, onLoginSuccess, onLoginFailure, onLogoutSuccess}) => {
    return (
        <div className="header">
            <div className="rTable" style={{width:'100%'}}>
            { userName !== '' ?
            <div className="rTableRow">
            <div className="rTableCell" style={ {width: "100%" }}><label>Welcome {userName}</label></div>  
            <div className="rTableCell" ><Logout onSuccess={onLogoutSuccess} /></div>
            </div>
            :
            <div className="rTableRow">
            <div className="rTableCell" style={ {width: "100%" }}><Login onSuccess={onLoginSuccess} onFailure={onLoginFailure}/></div>
            <div className="rTableCell"><label></label> </div>
            </div>
}
            
            <div className="rTableRow">
            <div className="rTableCell" style={ {width: "100%" }}>
            <h1>{title}</h1>
            </div>
           <div className="rTableCell">
           { userName !== '' ?
            <Button 
                color={showAddContact ? 'green': 'red'} 
                text= {showAddContact ? 'Add': 'Close'} 
                onClick={()=>onShowAddPanel()} 
                />
                :
                <label></label>
            }
            </div>
            </div>
            </div>
        </div>
    )
}

export default Header
