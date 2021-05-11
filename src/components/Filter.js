import { FaFilter } from 'react-icons/fa'
import Select from './Select'
import Filter_button from './Filter_button'

const Filter = ({ option }) => {
   

    return (
        <div className='filter'>
            
            <h2 style={{ float:'left' }}><FaFilter style={{paddingTop:'5px' }}/> Reminder:</h2>
            <Select option={option} />
         
        
        </div>
    )
}

export default Filter
