const Notes =require('../models/Notes');
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/Fetchuser')
const { body, validationResult } = require('express-validator');

//route 1 : to get all notes of an user using get request
router.get('/fetchallnotes',fetchuser , async(req, res)=>{
  try {
    const notes = await Notes.find({user : req.user.id});

  res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured in server");
  }
   
})

//route 2 : add a note of an user using post request
router.post('/addnotes', fetchuser ,[ 
  body('title' ,'title should be atleast of 5 characters').isLength({ min: 5 }),
   body('description' , 'description should be atleast of 5 characters').isLength({ min: 5 }),
], async(req, res)=>{

  try {
    const {title , description , tag} = req.body;
  const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
  const note =  new Notes({
title , description , tag , user:req.user.id
  });
  const savenote = await note.save();


  res.json(savenote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured in server");
  }

  
})

//route 3 : update an existing note, we generally send put request to update a note;
router.put('/updatenotes/:id' , fetchuser , async(req , res)=>{
 try {
  
 
  const {title , description , tag} =  req.body;
  const newnote= {};
  if(title) newnote.title= title;
 if(description) newnote.description=description;
 if(tag) newnote.tag=tag;

let note  = await Notes.findById(req.params.id);
if(!note) return res.status(401).send("Not Found");

if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed");
}
note = await Notes.findByIdAndUpdate(req.params.id ,{ $set:newnote} , {new :true});
res.json(note);

} catch (error) {
  console.error(error.message);
  res.status(500).send("Some error occured in server");
}
})

//route 4 : Delete an existing note, we generally send delete request to delete a note;
router.delete('/deletenotes/:id' , fetchuser , async(req , res)=>{
 try {
  
 
  // const {title , description , tag} =  req.body;
 

let note  = await Notes.findById(req.params.id);
if(!note) return res.status(401).send("Not Found");

if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed");
}
note = await Notes.findByIdAndDelete(req.params.id);
res.json({"Success":"Note has been deleted successfully" , note : note});

} catch (error) {
  console.error(error.message);
  res.status(500).send("Some error occured in server");
}
})


module.exports= router;