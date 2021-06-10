import { makeStyles } from "@material-ui/styles";
import { Fragment, useState, useEffect} from "react";
import Navbar from "./components/Navbar/Navbar"
import NoteCard from "./components/NoteCards/NoteCard" 
import AddNote from "./components/AddNote/AddNote"
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "notetakingapp.notes"

const useStyles = makeStyles({
  root : {
    width: '100%',
    display : "flex",
    flexWrap : "wrap",
    float : "left"
  }
})

const App = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  
  useEffect(()=>{
    const newNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, notes));
    setNotes(newNotes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes))

  }, [notes])
  
  const titleChange = (event) => {
      setTitle(event.target.value)      
  }
  const contentChange = (event) => {
      setContent(event.target.value)    
  }


  const saveNote = (event) => {
      const newNotes = [...notes, {id: uuidv4(), title : title, content: content}]
      if(title === "" || content === "") return null;
      else {setNotes(newNotes)
      setTitle('')
      setContent('')}
    }

    const deleteNote = (id) => {
      const newNotes = [...notes]
      const filterNotes = newNotes.filter(note => note.id !== id)
      setNotes(filterNotes)

    }

    const edit = (data) => {
      const newNotes = [...notes]
      let  findNote = newNotes.find(note => note.id === data.id)
      const index = notes.indexOf(findNote)
      findNote = {...data}
      newNotes[index] = findNote
      setNotes(newNotes)
    }


  return (
    <Fragment>
      <Navbar />
      <AddNote title= {title} content = {content} titleChange = {titleChange} contentChange = {contentChange} saveNote = {saveNote} />
      <div className = {classes.root}>
      {notes.map(note => <NoteCard key = {note.id} id = {note.id}  title = {note.title} content = {note.content} deleteNote = {deleteNote} edit = {edit}/>)}
      </div>
    
    </Fragment>
  );
}

export default App;
