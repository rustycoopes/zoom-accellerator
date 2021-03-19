import {useState} from 'react'

function Filter({onChange}) {
    
    const [filterString, setFilter] = useState('')

    const onFilterChange = (e) => {
        setFilter(e.target.value)
        onChange(e.target.value)
    }


    return (

            <div className='form-control'>
                <label>Filter</label>
                <input 
                    type='text' 
                    placeholder='Filter Contacts' 
                    value={filterString} 
                    onChange={(e)=> onFilterChange(e)}/>
            </div>
    )
}

export default Filter
