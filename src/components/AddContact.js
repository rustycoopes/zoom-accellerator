import {useState} from 'react'

export const AddContact = ({onAdd}) => {
    const [name, setName] = useState('')
    const [roomId, setRoomId] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!name){
            alert('Please add Name')
        }
        if(!roomId){
            alert('Please add Room Number')
        }
        onAdd({name, roomId, password})

        setName('')
        setRoomId('')
        setPassword('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Contact</label>
                <input 
                    type='text' 
                    placeholder='Add Contact' 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Room Number</label>
                <input 
                    type='text' 
                    placeholder='Room #' 
                    value={roomId} 
                    onChange={(e)=> setRoomId(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Room Password</label>
                <input 
                    type='text' 
                    placeholder='' 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <input type='submit' value='Save Contact' className='btn btn-block'/>
            
        </form>
    )
}

export default AddContact