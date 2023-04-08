import React, { useContext ,useState } from 'react'
import Notes from './Notes'; 
import NoteContext from '../Context/Notes/NoteContext';
export default function Addnote(props) {
  const {showAlert} = props.showAlert;
  const context = useContext(NoteContext);
  const {addnote} = context;
  const [note, setnote] = useState({"title" : "" , "description": "" ,"tag" :""});
  const onclickhandle=(ele)=>{
    ele.preventDefault();
    addnote(note.title, note.description, note.tag);
    setnote({"title" : "" , "description": "" ,"tag" :""});
    showAlert(" Note added successfully" , "success");

  }
  const onchange=(ele)=>{
     setnote({...note , [ele.target.name]: ele.target.value});
  }
  return (
    <div className='container'>
     
     <div className="container mt-1 " >
            <h2>Add a Note</h2>
        <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" value={note.title} name='title' id="title" aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" value={note.description} name='description' id="description" onChange={onchange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control"value={note.tag}  name='tag' id="tag" onChange={onchange} minLength={5} required/>
  </div>
  
  <button  disabled={note.description.length <5 || note.title.length <5} type="submit" className="btn btn-primary" onClick={onclickhandle}>Add Your Note</button>
  
</form> 
        </div>
        <div className="container mt-1">
      
          <Notes showAlert={showAlert} />
        </div>
        
    </div>
  )
}
