import React, {useContext, useEffect , useState,useRef} from 'react'

import Noteitem from './Noteitem';
import NoteContext from '../Context/Notes/NoteContext';
import { useNavigate } from 'react-router-dom';
// import Addnote from './Addnote';

const Notes = (props) => {
  const {showAlert}=props;
    const context = useContext(NoteContext);
    // eslint-disable-next-line
    const {notes , getNotes ,editnote} = context;
    const [note, setnote] = useState({ id: " " ,etitle : "" , edescription: "" ,etag :""});
    const ref =useRef(null);
    const refclose =useRef(null);
 const navigate = useNavigate();
    const onchange=(ele)=>{
        setnote({...note , [ele.target.name]: ele.target.value});
    }
    useEffect(() => {
       if(localStorage.getItem('token')){
        getNotes();
       }
       else{
         navigate("/login");
       }
        // eslint-disable-next-line
    }, [])
    
    
    const updateNote=(currentNote)=>{
        ref.current.click();
        setnote({ id:currentNote._id , etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag});
        
      }
    const onclickhandle=(ele)=>{
        // console.log("updating the note" , note);
        editnote(note.id , note.etitle, note.edescription , note.etag);
        refclose.current.click();
        props.showAlert(" Note updated successfully" , "success");
      }
    return (
        <>
        {/* <Addnote/> */}
       
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal 
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       
      <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" name='etitle' value={note.etitle} id="etitle" aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" name='edescription' value={note.edescription} id="edescription" onChange={onchange}  minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" name='etag' value={note.etag} id="etag" onChange={onchange} minLength={5} required/>
  </div>

      </div>
      <div className="modal-footer">  
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  disabled={note.edescription.length <5 || note.etitle.length <5} type="button" className="btn btn-primary" onClick={onclickhandle} >Update Note</button>
      </div>
    </div>
  </div>
</div>
        <div className="row my-3">
            <h2>Your Notes</h2> 
            <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
            {notes.map((notes)=>{
                return <Noteitem key={notes._id} updateNote={updateNote} showAlert={showAlert} note={notes}/>  
            })}
            </div>
            </>
    )
}

export default Notes