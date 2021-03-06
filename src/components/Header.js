import Button from './Button'

const Header = ({title, onShowAddPanel, showAddContact}) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button 
                color={showAddContact ? 'green': 'red'} 
                text= {showAddContact ? 'Add': 'Close'} 
                onClick={()=>onShowAddPanel()}/>
        </header>
    )
}

export default Header
