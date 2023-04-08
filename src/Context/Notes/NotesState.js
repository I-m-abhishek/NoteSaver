
import NoteContext from "./NoteContext";
import { useState } from "react";

const NotesState = (props)=>{
  const host = "http://localhost:5000"
  const s1 = [];
  const [notes, setNotes] = useState(s1);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem('token')

      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
      async function addnote(title, description, tag) {

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }
      const deletenote =async(id)=>{

         await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token" : localStorage.getItem('token')
    
          }
        });
        
      
        const newNotes= notes.filter((notes)=>{
          return notes._id !== id ;
        })
        setNotes(newNotes);
      }

      const editnote =async(id , title , description , tag)=>{

        await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
       
        let TotalNotes = JSON.parse(JSON.stringify(notes))
           for (let i = 0; i< TotalNotes.length; i++) {
            const element = TotalNotes[i];
            if(element._id === id){
              TotalNotes[i].title = title;
              TotalNotes[i].description = description;
              TotalNotes[i].tag= tag;
              break;
            }
            
           }
           setNotes(TotalNotes);
      }
    
    return (
        <NoteContext.Provider value={{notes , addnote ,deletenote , editnote ,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;