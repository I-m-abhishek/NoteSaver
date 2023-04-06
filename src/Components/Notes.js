import React, {useContext} from 'react'

import Noteitem from './Noteitem';
import NoteContext from '../Context/Notes/NoteContext';


const Notes = () => {
    const context = useContext(NoteContext);
    // eslint-disable-next-line
    const {notes , setNotes} = context;
    return (
        <div className="row my-3">
            <h2>Your Notes</h2> 
            {notes.map((notes)=>{
                return <Noteitem note={notes}/>  
            })}
            </div>
    )
}

export default Notes