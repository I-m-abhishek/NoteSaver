
import NoteContext from "./NoteContext";
import { useState } from "react";

const NotesState = (props)=>{
    const s1 = [
        {
          "_id": "642e8578cace5496efcfca42",
          "user": "642e855dcace5496efcfca3f",
          "title": "my country india",
          "description": "my country is one of the best of world",
          "tag": "patriot",
          "date": "2023-04-06T08:40:24.964Z",
          "__v": 0
        },
        {
          "_id": "642e8592cace5496efcfca46",
          "user": "642e855dcace5496efcfca3f",
          "title": "my country india again",
          "description": "my country is one of the best of world !!",
          "tag": "patriot",
          "date": "2023-04-06T08:40:50.675Z",
          "__v": 0
        },
        {
          "_id": "642e85b4cace5496efcfca49",
          "user": "642e855dcace5496efcfca3f",
          "title": "my country india again",
          "description": "my country is one of the best of world !z!",
          "tag": "patriot",
          "date": "2023-04-06T08:41:24.997Z",
          "__v": 0
        },
        {
          "_id": "642e85b9cace5496efcfca4b",
          "user": "642e855dcace5496efcfca3f",
          "title": "my country india again",
          "description": "my country is one of the best of world !aaz!",
          "tag": "patriot",
          "date": "2023-04-06T08:41:29.986Z",
          "__v": 0
        }
      ]
     const [notes, setNotes] = useState(s1);

    
    return (
        <NoteContext.Provider value={{notes ,  setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;