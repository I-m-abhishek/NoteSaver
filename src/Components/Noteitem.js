import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext';

const Noteitem = (props) => {
    const {showAlert}= props;
    const context = useContext(NoteContext);
    const {deletenote} = context;
    const { note , updateNote } = props;
   
    return (
        <div className="col-md-3"> 
            <div className="card my-3"> 
                <div className="card-body">
               <div className="d-flex align-item-center"> 
                <h5 className="card-title">{note.title}  
                <i className="fa-solid fa-trash mx-2" onClick={ ()=>{deletenote(note._id);
                 showAlert("Deleted Successfully" , "success"); } } ></i>
                <i className="fa-solid fa-pen-to-square mx-2 " onClick={()=>{updateNote(note)}}></i></h5>
                </div>
                <p className="card-text">{note.description}</p> 
                </div>
            </div>
        </div>
    )
}

export default Noteitem